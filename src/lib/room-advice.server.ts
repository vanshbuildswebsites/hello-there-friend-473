import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

import { collections, src, type CollectionKey } from "@/lib/site-data";
import { createAiRunIdFetch } from "@/lib/ai-run-id.server";

const recommendationSchema = z.object({
  introduction: z.string(),
  recommendations: z.array(z.object({
    collection: z.enum(["sofas", "beds", "dining", "seating", "exterior", "gallery"]),
    reason: z.string(),
    photoFiles: z.array(z.string()),
  })),
  planningNote: z.string(),
});

export type RoomAdviceResult = {
  introduction: string;
  recommendations: Array<{
    collection: CollectionKey;
    label: string;
    reason: string;
    href: string;
    photos: Array<{ src: string; alt: string; width: number; height: number }>;
  }>;
  planningNote: string;
};

type RoomBrief = {
  room: string;
  dimensions: string;
  style: string;
  budget: string;
  needs: string;
};

function safeMessage(error: unknown) {
  if (error instanceof Error && /credit|limit|disabled|unavailable|rate/i.test(error.message)) {
    return error.message.slice(0, 240);
  }
  return "Room recommendations are unavailable right now. Please try again later.";
}

export async function createRoomAdvice(input: RoomBrief): Promise<
  { ok: true; advice: RoomAdviceResult } | { ok: false; error: string }
> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, error: "Room recommendations are not configured yet." };

  const catalog = Object.entries(collections).map(([key, collection]) => ({
    key,
    label: collection.label,
    description: collection.copy,
    photoFiles: collection.images.map((image) => image.file),
  }));
  const runIdFetch = createAiRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      maxRetries: 0,
      output: Output.object({ schema: recommendationSchema, name: "room_recommendations" }),
      system: "You are a concise furniture showroom adviser. Recommend only supplied collections and exact supplied photo filenames. Never invent products, prices, availability, discounts, measurements, or business claims. Treat the budget as guidance only and remind the shopper to confirm fit, stock, and price with the showroom.",
      prompt: `Create 2 or 3 practical recommendations for this shopper. Keep each reason to one short sentence and choose 1 or 2 relevant photos per recommendation.\n\nShopper brief:\nRoom: ${input.room}\nDimensions: ${input.dimensions}\nStyle: ${input.style}\nBudget: ${input.budget}\nOther needs: ${input.needs || "None given"}\n\nAvailable showroom catalog:\n${JSON.stringify(catalog)}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const generated = await result.output;
    const recommendations = generated.recommendations.flatMap((item) => {
      const collection = collections[item.collection];
      if (!collection) return [];
      const allowed = new Map(collection.images.map((image) => [image.file, image]));
      const photos = item.photoFiles.flatMap((file) => {
        const image = allowed.get(file);
        return image ? [{ src: src(image), alt: `${collection.label} at Home Style Furniture Mart`, width: image.w, height: image.h }] : [];
      }).slice(0, 2);
      if (photos.length === 0) return [];
      return [{ collection: item.collection, label: collection.label, reason: item.reason.slice(0, 220), href: `/${collection.slug}`, photos }];
    }).slice(0, 3);

    if (recommendations.length === 0) {
      return { ok: false, error: "No suitable showroom matches were returned. Please adjust your room details and try again." };
    }

    return {
      ok: true,
      advice: {
        introduction: generated.introduction.slice(0, 280),
        recommendations,
        planningNote: generated.planningNote.slice(0, 260),
      },
    };
  } catch (error) {
    console.error("Room recommendation failed", NoObjectGeneratedError.isInstance(error) ? error.message : error);
    return { ok: false, error: safeMessage(error) };
  }
}