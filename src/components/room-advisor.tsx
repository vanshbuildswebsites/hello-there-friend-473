import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { recommendForRoom } from "@/lib/room-advice.functions";
import type { RoomAdviceResult } from "@/lib/room-advice.server";

export function RoomAdvisor() {
  const recommend = useServerFn(recommendForRoom);
  const [advice, setAdvice] = useState<RoomAdviceResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setAdvice(null);
    setLoading(true);
    try {
      const result = await recommend({ data: {
        room: String(form.get("room") ?? ""),
        dimensions: String(form.get("dimensions") ?? ""),
        style: String(form.get("style") ?? ""),
        budget: String(form.get("budget") ?? ""),
        needs: String(form.get("needs") ?? ""),
      } });
      if (result.ok) setAdvice(result.advice);
      else setError(result.error);
    } catch {
      setError("Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return <section id="room-advice" className="band room-advisor"><div className="wrap">
    <div className="heading"><p className="eyebrow">03 / ROOM ADVISER</p><h2>Find pieces for your space.</h2><p className="lead">Share a few room details and receive thoughtful matches from our showroom collections.</p></div>
    <div className="advisor-layout">
      <form className="advisor-form" onSubmit={submit}>
        <label><span>Room</span><input name="room" required maxLength={80} placeholder="Living room, bedroom…" /></label>
        <label><span>Dimensions</span><input name="dimensions" required maxLength={100} placeholder="For example, 12 × 15 ft" /></label>
        <label><span>Preferred style</span><input name="style" required maxLength={80} placeholder="Modern, classic, minimal…" /></label>
        <label><span>Budget</span><input name="budget" required maxLength={80} placeholder="Your approximate budget" /></label>
        <label className="advisor-wide"><span>Anything else we should consider?</span><textarea name="needs" maxLength={500} rows={4} placeholder="Colours, storage needs, children, pets, existing pieces…" /></label>
        <Button type="submit" className="btn btn-gold advisor-submit" disabled={loading}>{loading ? <LoaderCircle className="advisor-spinner" /> : <Sparkles />}{loading ? "Considering your room…" : "Recommend from showroom"}</Button>
        <p className="advisor-note">Recommendations use the showroom photos on this site. Confirm dimensions, availability and price with the store.</p>
      </form>
      <div className="advisor-results" aria-live="polite" aria-busy={loading}>
        {!loading && !advice && !error ? <div className="advisor-empty"><Sparkles /><p>Your personalised showroom edit will appear here.</p></div> : null}
        {loading ? <div className="advisor-empty"><LoaderCircle className="advisor-spinner" /><p>Looking through the showroom collection…</p></div> : null}
        {error ? <div className="advisor-error"><strong>We couldn’t prepare your edit.</strong><p>{error}</p></div> : null}
        {advice ? <div className="advice-content"><p className="advice-intro">{advice.introduction}</p><div className="advice-list">{advice.recommendations.map((item) => <article key={item.collection} className="advice-item"><div className="advice-photos">{item.photos.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />)}</div><div><p className="eyebrow">{item.label.toUpperCase()}</p><p>{item.reason}</p><Link to={item.href as "/sofas"} className="view-more">View collection <ArrowRight /></Link></div></article>)}</div><p className="advisor-note">{advice.planningNote}</p></div> : null}
      </div>
    </div>
  </div></section>;
}