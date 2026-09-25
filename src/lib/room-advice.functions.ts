import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createRoomAdvice } from "@/lib/room-advice.server";

const roomBriefSchema = z.object({
  room: z.string().trim().min(2).max(80),
  dimensions: z.string().trim().min(2).max(100),
  style: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(2).max(80),
  needs: z.string().trim().max(500),
});

export const recommendForRoom = createServerFn({ method: "POST" })
  .inputValidator((input) => roomBriefSchema.parse(input))
  .handler(async ({ data }) => createRoomAdvice(data));