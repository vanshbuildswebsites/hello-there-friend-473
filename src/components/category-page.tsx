import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer, Header, Disclaimer, Photo } from "@/components/site-chrome";
import { collections, type CollectionKey } from "@/lib/site-data";

export function CategoryPage({ k }: { k: CollectionKey }) {
  const c = collections[k];
  return <div className="site-shell">
    <Disclaimer />
    <Header home={false} />
    <main className="band category-page"><div className="wrap">
      <Link to="/" className="back-link"><ArrowLeft /> Back to Home</Link>
      <div className="heading"><p className="eyebrow">{c.no} / {c.label.toUpperCase()}</p><h1>{c.title}</h1><p className="lead">{c.copy}</p></div>
      <div className="stack">{c.images.map((img) => <Photo key={img.file} img={img} alt={`${c.label} at Home Style Furniture Mart`} />)}</div>
    </div></main>
    <Footer />
  </div>;
}

export const categoryHead = (k: CollectionKey) => {
  const c = collections[k];
  const title = `${c.title} | Home Style Furniture Mart, Khatima`;
  const description = `${c.copy} Home Style Furniture Mart, Khatima, Uttarakhand.`;
  return () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] });
};
