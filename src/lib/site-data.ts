// Single source of truth for business details and image collections.
export const business = {
  name: "Home Style Furniture Mart",
  address: "SH 29, Bhujia No. 3, Khatima, Charu Beta, Uttarakhand 262308, India",
  phoneDisplay: "+91 84493 11567",
  email: "homestylefurnituremart@gmail.com",
  call: "tel:+918449311567",
  whatsapp: "https://wa.me/918449311567",
  mail: "mailto:homestylefurnituremart@gmail.com",
  instagram: "https://instagram.com/home_style_furniture_mart",
  facebook: "https://www.facebook.com/rohit.choudhari.583",
  maps: "https://www.google.com/maps/search/?api=1&query=Home%20Style%20Furniture%20Mart%2C%20SH%2029%2C%20Bhujia%20No.%203%2C%20Khatima%2C%20Charu%20Beta%2C%20Uttarakhand%20262308",
  rating: "4.8",
};

export type Img = { file: string; w: number; h: number };
const i = (file: string, w: number, h: number): Img => ({ file, w, h });
export const src = (img: Img) => `/images/${img.file}`;

export const hero = i("hero.jpg", 960, 960);

export const collections = {
  sofas: { slug: "sofas", no: "03", label: "Sofas", title: "Sofas & living seating", copy: "Comfortable seating for everyday living.", images: [i("sofa-01.jpg", 960, 718), i("sofa-02.jpg", 1280, 963), i("sofa-03.jpg", 720, 538), i("sofa-04.jpg", 719, 528), i("sofa-05.jpg", 718, 375), i("sofa-06.jpg", 719, 651), i("sofa-living-02.jpg", 718, 446), i("sofa-living-03.jpg", 719, 540)] },
  beds: { slug: "beds", no: "05", label: "Bedroom", title: "Beds & bedroom", copy: "Beds and bedroom pieces for restful spaces.", images: [i("bed-01.jpg", 720, 526), i("bed-02.jpg", 719, 514), i("bed-03.jpg", 718, 530), i("bed-04.jpg", 500, 375), i("bed-05.jpg", 500, 375), i("bed-06.jpg", 664, 484), i("bed-07.jpg", 663, 768), i("bed-living-02.jpg", 700, 617)] },
  dining: { slug: "dining", no: "06", label: "Dining", title: "Dining sets", copy: "Dining furniture made for everyday gatherings.", images: [i("dining-01.jpg", 719, 533), i("dining-02.jpg", 720, 859), i("dining-03.jpg", 720, 523), i("dining-04.jpg", 718, 580), i("dining-05.jpg", 720, 533), i("dining-living-01.jpg", 719, 563)] },
  seating: { slug: "seating", no: "07", label: "Seating", title: "Chairs & hanging chairs", copy: "Chairs and seating for every corner.", images: [i("chair-01.jpg", 535, 876), i("chair-02.jpg", 582, 709), i("hanging-chair-01.jpg", 535, 970), i("hanging-chair-02.jpg", 532, 869), i("hanging-chair-03.jpg", 694, 318)] },
  exterior: { slug: "exterior", no: "09", label: "Showroom", title: "The showroom", copy: "Our Khatima showroom on SH 29.", images: [i("exterior-02.jpg", 677, 921), i("exterior-03.jpg", 718, 539), i("exterior-04.jpg", 534, 1028), i("exterior-05.jpg", 532, 1112), i("exterior-06.jpg", 599, 775)] },
  gallery: { slug: "gallery", no: "12", label: "Gallery", title: "Gallery", copy: "More moments from the store.", images: [i("gallery-01.jpg", 718, 452), i("gallery-02.jpg", 720, 466), i("gallery-03.jpg", 718, 541), i("gallery-04.jpg", 720, 442), i("gallery-05.jpg", 720, 516), i("gallery-06.jpg", 651, 385), i("gallery-07.jpg", 1728, 972)] },
} as const;
export type CollectionKey = keyof typeof collections;

export const lighting = [i("decor-01.jpg", 720, 938), i("decor-02.jpg", 538, 899), i("decor-03.jpg", 600, 941)];
export const decor = [i("table-01.jpg", 718, 551), i("table-living-01.jpg", 720, 536), i("sofa-living-01.jpg", 360, 360), i("bed-living-01.jpg", 1080, 1201)];
export const interior = [i("interior-01.jpg", 720, 524), i("interior-02.jpg", 719, 965)];

export const navItems = [["The idea", "idea"], ["Collections", "collections"], ["Showroom", "showroom"], ["Gallery", "gallery"], ["Contact", "contact"]] as const;
