import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { Disclaimer, Footer, Header, Photo } from "@/components/site-chrome";
import { business, collections, decor, hero, interior, lighting, src, type CollectionKey, type Img } from "@/lib/site-data";

function Heading({ no, label, title, copy }: { no: string; label: string; title: string; copy?: string }) {
  return <div className="heading"><p className="eyebrow">{no} / {label}</p><h2>{title}</h2>{copy ? <p className="lead">{copy}</p> : null}</div>;
}

function Preview({ k, dark = false }: { k: CollectionKey; dark?: boolean }) {
  const c = collections[k];
  const more = c.images.length > 3;
  const shown = more ? c.images.slice(0, 4) : c.images;
  return <section id={k === "exterior" ? "showroom" : k} className={`band ${dark ? "band-dark" : ""}`}><div className="wrap">
    <Heading no={c.no} label={c.label.toUpperCase()} title={c.title} copy={c.copy} />
    <div className="masonry">{shown.map((img) => <Photo key={img.file} img={img} alt={`${c.label} at Home Style Furniture Mart`} />)}</div>
    {more ? <Link className="view-more" to={`/${c.slug}` as "/sofas"}>View More <ArrowRight /></Link> : null}
  </div></section>;
}

function Static({ id, no, label, title, copy, images, dark = false }: { id: string; no: string; label: string; title: string; copy: string; images: Img[]; dark?: boolean }) {
  return <section id={id} className={`band ${dark ? "band-dark" : ""}`}><div className="wrap"><Heading no={no} label={label} title={title} copy={copy} /><div className="masonry">{images.map((img) => <Photo key={img.file} img={img} alt={`${title} at Home Style Furniture Mart`} />)}</div></div></section>;
}

export function FurnitureSite() {
  return <div className="site-shell">
    <Disclaimer />
    <Header />
    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">FURNITURE · LIGHTING · HOME</p>
          <h1>Make room for better living.</h1>
          <p className="lead">Discover furniture and home pieces for living rooms, bedrooms, dining spaces and more.</p>
          <div className="actions"><a className="btn btn-gold" href="#collections">Explore furniture</a><a className="btn btn-line" href={business.maps} target="_blank" rel="noreferrer">Visit showroom</a></div>
          <p className="hero-loc"><MapPin /> Showroom in Khatima, Uttarakhand</p>
        </div>
        <div className="hero-media"><img src={src(hero)} alt="Home Style Furniture Mart showroom" width={hero.w} height={hero.h} loading="eager" fetchPriority="high" /></div>
      </section>

      <section id="idea" className="band"><div className="wrap idea">
        <Heading no="01" label="THE IDEA" title="A local showroom for the whole home." />
        <p className="lead">Home Style Furniture Mart brings together sofas, beds, dining sets, seating, lighting and décor under one roof in Khatima — so you can see, compare and choose pieces in person.</p>
      </div></section>

      <section id="collections" className="band band-cream"><div className="wrap">
        <Heading no="02" label="COLLECTIONS" title="Browse by room." />
        <ol className="collection-list">
          {[["Sofas", "#sofas"], ["Lighting", "#lighting"], ["Bedroom", "#beds"], ["Dining", "#dining"], ["Seating", "#seating"], ["Décor", "#decor"]].map(([l, h], n) => <li key={h}><a href={h}><span>0{n + 3}</span>{l}<ArrowRight /></a></li>)}
        </ol>
      </div></section>

      <Preview k="sofas" />
      <Static id="lighting" no="04" label="LIGHTING" title="Lighting & accents" copy="Lamps and décor pieces to finish a room." images={lighting} dark />
      <Preview k="beds" />
      <Preview k="dining" />
      <Preview k="seating" />
      <Static id="decor" no="08" label="DECOR" title="Tables & living spaces" copy="Tables and styled living corners." images={decor} />
      <Preview k="exterior" dark />
      <Static id="inside" no="10" label="INSIDE" title="Inside the store" copy="A look at the showroom floor." images={interior} />

      <section id="store" className="band band-dark"><div className="wrap store">
        <Heading no="11" label="THE STORE" title="Visit us in Khatima." copy={business.address} />
        <div className="rating"><p className="eyebrow">RATING</p><strong>{business.rating}<small>/5</small></strong><div className="stars" aria-hidden>{Array.from({ length: 5 }).map((_, n) => <Star key={n} />)}</div><p>Rated by customers on Google</p></div>
      </div></section>

      <Preview k="gallery" />

      <section id="contact" className="band band-dark"><div className="wrap contact">
        <Heading no="13" label="CONTACT" title="Come see it in person." copy={business.address} />
        <div className="contact-list">
          <a href={business.call}><Phone /><span><small>Call</small>{business.phoneDisplay}</span></a>
          <a href={business.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small>Message us</span></a>
          <a href={business.mail}><Mail /><span><small>Email</small>{business.email}</span></a>
          <a href={business.maps} target="_blank" rel="noreferrer"><MapPin /><span><small>Directions</small>Open in Google Maps</span></a>
          <a href={business.instagram} target="_blank" rel="noreferrer"><Instagram /><span><small>Instagram</small>@home_style_furniture_mart</span></a>
          <a href={business.facebook} target="_blank" rel="noreferrer"><Facebook /><span><small>Facebook</small>Follow on Facebook</span></a>
        </div>
      </div></section>
    </main>
    <Footer />
  </div>;
}
