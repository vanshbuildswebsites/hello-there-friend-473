import { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { business, navItems, src, type Img } from "@/lib/site-data";

export function Disclaimer() {
  return <div className="disclaimer"><strong>🔒 CONCEPT DEMO — NOT AN OFFICIAL WEBSITE</strong><span>This is an unofficial website concept created by Vansh Builds Websites for demonstration purposes only. It is not affiliated with or officially associated with the business shown.</span></div>;
}

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  return <>
    <header className="site-header">
      <a className="brand" href={home ? "#home" : "/"}><strong>Home Style</strong><small>Furniture Mart</small></a>
      <nav className="desktop-nav" aria-label="Main">{navItems.map(([l, id]) => <a key={id} href={href(id)}>{l}</a>)}</nav>
      <div className="header-actions">
        <a className="btn btn-gold header-cta" href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
        <button className="icon-btn menu-trigger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
      </div>
    </header>
    <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="mobile-menu-head"><span className="brand"><strong>Home Style</strong><small>Furniture Mart</small></span><button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}><X /></button></div>
      <nav aria-label="Mobile">{navItems.map(([l, id], n) => <a key={id} href={href(id)} onClick={() => setOpen(false)}><span>0{n + 1}</span>{l}</a>)}</nav>
      <a className="btn btn-gold" href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a>
    </div>
  </>;
}

export function Photo({ img, alt, eager = false }: { img: Img; alt: string; eager?: boolean }) {
  return <figure className="photo"><img src={src(img)} alt={alt} width={img.w} height={img.h} loading={eager ? "eager" : "lazy"} decoding="async" /></figure>;
}

export function Footer() {
  return <>
    <footer className="footer">
      <div className="footer-main">
        <div><span className="brand brand-light"><strong>Home Style</strong><small>Furniture Mart</small></span><p>{business.address}</p></div>
        <div className="footer-links">
          <a href={business.call}><Phone /> {business.phoneDisplay}</a>
          <a href={business.mail}><Mail /> {business.email}</a>
          <a href={business.maps} target="_blank" rel="noreferrer"><MapPin /> Directions</a>
        </div>
        <div className="social"><a href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a href={business.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a><a href={business.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></div>
      </div>
      <Disclaimer />
      <p className="footer-bottom">© 2026 Home Style Furniture Mart</p>
    </footer>
    <div className="action-bar"><a href={business.call}><Phone /><span>Call</span></a><a href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp</span></a><a href={business.maps} target="_blank" rel="noreferrer"><MapPin /><span>Directions</span></a></div>
  </>;
}
