import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, BedDouble, ChevronRight, Clock3, Gem, Instagram, LampFloor, Menu, MessageCircle, MoveRight, Phone, Sofa, Sparkles, Star, Store, TableProperties, UsersRound, Warehouse, X } from "lucide-react";
import bedroomImage from "@/assets/bedroom.jpg";
import diningImage from "@/assets/dining-showroom.jpg";
import heroImage from "@/assets/furniture-hero.jpg";
import livingImage from "@/assets/living-room.jpg";
import { Button } from "@/components/ui/button";

const business = {
  phoneDisplay: "+91 00000 00000",
  phoneHref: "+910000000000",
  whatsappHref: "https://wa.me/910000000000?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20your%20furniture%20collection.",
  address: "Your showroom address, City, State — PIN",
  hours: "Mon–Sun · 10:00 AM–8:00 PM",
};
const navItems = [["Home", "#home"], ["About", "#about"], ["Furniture", "#furniture"], ["Gallery", "#gallery"], ["Why Us", "#why-us"], ["Contact", "#contact"]] as const;
const categories = [
  { name: "Sofas & Seating", text: "Comfortable seating for every conversation.", image: livingImage, icon: Sofa },
  { name: "Beds", text: "Restful designs, crafted for better nights.", image: bedroomImage, icon: BedDouble },
  { name: "Dining Sets", text: "Tables made for everyday gatherings.", image: diningImage, icon: TableProperties },
  { name: "Wardrobes", text: "Organised storage with a refined finish.", image: bedroomImage, icon: Warehouse },
  { name: "Tables", text: "Useful surfaces in timeless silhouettes.", image: diningImage, icon: TableProperties },
  { name: "Home Décor", text: "Finishing touches that bring rooms together.", image: livingImage, icon: LampFloor },
  { name: "Office Furniture", text: "Purposeful pieces for productive spaces.", image: diningImage, icon: Store },
  { name: "Custom Furniture", text: "Made around your space and preferences.", image: heroImage, icon: Sparkles },
];
const featured = [
  { name: "The Aarna Lounge Sofa", text: "Deep, relaxed seating with a soft, modern profile.", image: livingImage },
  { name: "The Virasat Bed", text: "Warm wood, an upholstered headboard and enduring comfort.", image: bedroomImage },
  { name: "The Milan Dining Set", text: "A welcoming six-seater designed for shared moments.", image: diningImage },
];
const benefits = [
  { icon: Gem, title: "Quality", text: "Furniture selected with quality and durability in mind." },
  { icon: Sparkles, title: "Modern Designs", text: "Stylish designs thoughtfully chosen for modern homes." },
  { icon: Warehouse, title: "Wide Selection", text: "Options for different rooms, needs and personal styles." },
  { icon: UsersRound, title: "Customer Service", text: "Helpful assistance before and after your purchase." },
];
const galleryItems = [
  { src: livingImage, alt: "Contemporary cream sofa and accent chair", className: "gallery-wide" },
  { src: bedroomImage, alt: "Walnut bed with an upholstered headboard", className: "gallery-tall" },
  { src: diningImage, alt: "Solid wood six-seat dining set", className: "" },
  { src: heroImage, alt: "Warm premium furniture showroom interior", className: "gallery-tall" },
  { src: livingImage, alt: "Styled living room furniture collection", className: "" },
  { src: diningImage, alt: "Dining room furniture and sideboard", className: "gallery-wide" },
];

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading reveal ${light ? "section-heading-light" : ""}`}><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{copy ? <p className="section-copy">{copy}</p> : null}</div>;
}

export function FurnitureSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const activeGalleryItem = activeImage === null ? undefined : galleryItems[activeImage];
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen || activeImage !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, activeImage]);
  useEffect(() => {
    if (activeImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") setActiveImage((activeImage + 1) % galleryItems.length);
      if (event.key === "ArrowLeft") setActiveImage((activeImage - 1 + galleryItems.length) % galleryItems.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Home Style Furniture Mart home"><span className="brand-mark">HS</span><span className="brand-copy"><strong>Home Style</strong><small>Furniture Mart</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><Button asChild className="header-enquire"><a href={business.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> Enquire Now</a></Button><Button variant="ghost" size="icon" className="menu-trigger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></Button></div>
    </header>
    <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu-head"><span className="brand-mark">HS</span><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></Button></div>
      <nav aria-label="Mobile navigation">{navItems.map(([label, href], index) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ChevronRight /></a>)}</nav>
      <Button asChild size="lg"><a href={business.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp Us</a></Button>
    </div>
    <main>
      <section className="hero" id="home"><img className="hero-image" src={heroImage} alt="Elegant furniture showroom with a curved sofa" width={1920} height={1080} fetchPriority="high" /><div className="hero-shade" /><div className="hero-content"><p className="hero-kicker"><span /> Furniture for better living</p><h1>Furniture That Makes Your Home <em>Feel Like Home.</em></h1><p className="hero-lead">Discover stylish, comfortable and quality furniture for every corner of your home.</p><div className="hero-actions"><Button asChild size="lg"><a href="#furniture">Explore Furniture <ArrowDownRight /></a></Button><Button asChild size="lg" variant="outlineLight"><a href="#contact">Contact Us</a></Button></div></div><div className="hero-trust"><span>Quality Furniture</span><i /><span>Modern Designs</span><i /><span>Trusted Service</span></div></section>
      <section className="about section" id="about"><div className="about-image-wrap reveal"><img src={livingImage} alt="Contemporary sofa in a warm living room" width={1400} height={1100} loading="lazy" /><div className="about-note"><strong>Furniture for</strong><span>Everyday Living</span></div></div><div className="about-copy reveal"><p className="eyebrow">Our Story</p><h2>Furniture Made for the Way You Live</h2><p>Home Style Furniture Mart is your local destination for thoughtfully selected furniture that balances comfort, style and everyday practicality.</p><p>From relaxed living spaces to restful bedrooms and welcoming dining rooms, we help you find pieces that feel right at home.</p><a className="text-link" href="#contact">Visit our showroom <MoveRight /></a></div></section>
      <section className="categories section" id="furniture"><SectionHeading eyebrow="The Collection" title="Explore Our Furniture" copy="Well-made essentials and statement pieces for every room, lifestyle and need." /><div className="category-grid">{categories.map((item, index) => { const Icon = item.icon; return <a className="category-card reveal" href="#contact" key={item.name}><img src={item.image} alt="" width={700} height={550} loading="lazy" /><span className="category-number">0{index + 1}</span><div className="category-content"><Icon /><h3>{item.name}</h3><p>{item.text}</p><ArrowDownRight /></div></a>; })}</div></section>
      <section className="featured section"><SectionHeading eyebrow="Handpicked for You" title="Featured Furniture" copy="A closer look at pieces loved for their comfort, material and timeless appeal." /><div className="featured-grid">{featured.map((item) => <article className="product-card reveal" key={item.name}><div className="product-image"><img src={item.image} alt={item.name} width={1400} height={1100} loading="lazy" /></div><div className="product-copy"><h3>{item.name}</h3><p>{item.text}</p><Button asChild variant="outline" size="sm"><a href={business.whatsappHref} target="_blank" rel="noreferrer">Enquire Now <MessageCircle /></a></Button></div></article>)}</div></section>
      <section className="why section-dark" id="why-us"><div className="section"><SectionHeading light eyebrow="The Home Style Promise" title="Why Choose Home Style Furniture Mart?" /><div className="benefit-grid">{benefits.map((benefit, index) => { const Icon = benefit.icon; return <article className="benefit-card reveal" key={benefit.title}><span>0{index + 1}</span><Icon /><h3>{benefit.title}</h3><p>{benefit.text}</p></article>; })}</div></div></section>
      <section className="gallery-section section" id="gallery"><SectionHeading eyebrow="Inside Our World" title="Spaces That Inspire" copy="Explore furniture ideas for living, dining and restful spaces." /><div className="gallery-grid">{galleryItems.map((item, index) => <Button variant="ghost" className={`gallery-item reveal ${item.className}`} key={`${item.alt}-${index}`} onClick={() => setActiveImage(index)} aria-label={`View ${item.alt}`}><img src={item.src} alt={item.alt} width={1400} height={1100} loading="lazy" /><span><ArrowDownRight /></span></Button>)}</div></section>
      <section className="testimonials section"><SectionHeading eyebrow="Customer Notes" title="What Our Customers Say" copy="Sample review layout — replace with verified customer feedback." /><div className="testimonial-grid">{["The team helped us choose a sofa that worked beautifully in our living room.", "A welcoming showroom experience with plenty of thoughtful options.", "Helpful guidance, comfortable furniture and a smooth buying experience."].map((quote, index) => <figure className="testimonial reveal" key={quote}><div className="stars" aria-label="Sample five-star rating">{Array.from({ length: 5 }).map((_, star) => <Star key={star} />)}</div><blockquote>“{quote}”</blockquote><figcaption><strong>Sample Customer {index + 1}</strong><span>Placeholder review</span></figcaption></figure>)}</div></section>
      <section className="contact section-dark" id="contact"><div className="contact-grid section"><div className="contact-intro reveal"><p className="eyebrow">Visit or Get in Touch</p><h2>Looking for the Right Furniture?</h2><p>Visit our showroom or contact us to explore our latest furniture collection.</p><div className="contact-actions"><Button asChild size="lg"><a href={business.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp Us</a></Button><Button asChild size="lg" variant="outlineLight"><a href={`tel:${business.phoneHref}`}><Phone /> Call Showroom</a></Button></div><span className="placeholder-label">Contact details shown below are placeholders</span></div><div className="contact-details reveal"><div><Store /><span><small>Showroom address</small>{business.address}</span></div><div><Phone /><span><small>Phone</small>{business.phoneDisplay}</span></div><div><Clock3 /><span><small>Opening hours</small>{business.hours}</span></div></div><div className="map-placeholder reveal" aria-label="Google Maps placeholder"><div><span><Store /></span><strong>Google Maps</strong><p>Your showroom location will appear here.</p><small>Placeholder location</small></div></div></div></section>
    </main>
    <footer className="footer"><div className="footer-main"><div><a className="brand footer-brand" href="#home"><span className="brand-mark">HS</span><span className="brand-copy"><strong>Home Style</strong><small>Furniture Mart</small></span></a><p>Comfortable, stylish furniture for the way your home lives.</p></div><nav aria-label="Footer navigation">{navItems.filter(([label]) => label !== "Why Us").map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="social-links"><a href={business.whatsappHref} aria-label="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle /></a><a href="#contact" aria-label="Instagram"><Instagram /></a><a href={`tel:${business.phoneHref}`} aria-label="Call us"><Phone /></a></div></div><div className="footer-bottom"><span>© 2026 Home Style Furniture Mart. All rights reserved.</span><span>Made for homes with character.</span></div></footer>
    <div className="mobile-action-bar"><a href={business.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /><span>WhatsApp</span></a><a href={`tel:${business.phoneHref}`}><Phone /><span>Call</span></a><a href="#contact"><Store /><span>Visit</span></a></div>
    {activeImage !== null && activeGalleryItem ? <div className="lightbox" role="dialog" aria-modal="true" aria-label="Furniture gallery image"><Button variant="lightbox" size="icon" className="lightbox-close" aria-label="Close gallery" onClick={() => setActiveImage(null)}><X /></Button><Button variant="lightbox" size="icon" className="lightbox-prev" aria-label="Previous image" onClick={() => setActiveImage((activeImage - 1 + galleryItems.length) % galleryItems.length)}><ArrowLeft /></Button><img src={activeGalleryItem.src} alt={activeGalleryItem.alt} /><Button variant="lightbox" size="icon" className="lightbox-next" aria-label="Next image" onClick={() => setActiveImage((activeImage + 1) % galleryItems.length)}><ArrowRight /></Button><p>{activeImage + 1} / {galleryItems.length}</p></div> : null}
  </div>;
}