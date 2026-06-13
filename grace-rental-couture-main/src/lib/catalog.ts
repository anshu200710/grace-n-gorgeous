export type Product = {
  slug: string;
  name: string;
  category: string;
  retail: number;
  fabric: string;
  color: string;
  image: string;
  badge?: string;
};

import bridal from "@/assets/col-bridal.jpg";
import saree from "@/assets/col-saree.jpg";
import reception from "@/assets/col-reception.jpg";
import haldi from "@/assets/col-haldi.jpg";
import mehendi from "@/assets/col-mehendi.jpg";
import rentals from "@/assets/col-rentals.jpg";
import celeb from "@/assets/celebrity-banner.jpg";
import product1 from "@/assets/product1.jpeg";
import product2 from "@/assets/product2.jpeg";
import product3 from "@/assets/product3.jpeg";
import product4 from "@/assets/product4.jpeg";
import product5 from "@/assets/product5.jpeg";
import product6 from "@/assets/product6.jpeg";
import product7 from "@/assets/product7.jpeg";
import product8 from "@/assets/product8.jpeg";
import product9 from "@/assets/product9.jpeg";
import product10 from "@/assets/product10.jpeg";
import product11 from "@/assets/product11.jpeg";
import product12 from "@/assets/product12.jpeg";
import product13 from "@/assets/product13.jpeg";

export const PRODUCTS: Product[] = [
  { slug: "rani-zardozi-lehenga", name: "Rani Zardozi Lehenga", category: "Bridal", retail: 145000, fabric: "Raw Silk · Zardozi", color: "Maroon", image: product1, badge: "Signature" },
  { slug: "noor-banarasi-saree", name: "Noor Banarasi Saree", category: "Saree", retail: 48000, fabric: "Pure Banarasi Silk", color: "Wine", image: product2, badge: "New" },
  { slug: "gulnaaz-reception", name: "Gulnaaz Reception Lehenga", category: "Reception", retail: 92000, fabric: "Organza · Sequin", color: "Nude Pink", image: product3 },
  { slug: "marigold-haldi-set", name: "Marigold Haldi Set", category: "Haldi", retail: 32000, fabric: "Cotton Silk", color: "Mustard", image: product4 },
  { slug: "zara-mehendi-anarkali", name: "Zara Mehendi Anarkali", category: "Mehendi", retail: 36000, fabric: "Georgette · Gota", color: "Emerald", image: product5, badge: "Trending" },
  { slug: "shaan-velvet-anarkali", name: "Shaan Velvet Anarkali", category: "Reception", retail: 72000, fabric: "Velvet · Resham", color: "Crimson", image: product6 },
  { slug: "heritage-edit-saree", name: "Heritage Edit Saree", category: "Saree", retail: 39000, fabric: "Tussar · Zari", color: "Champagne", image: product7 },
  { slug: "shahi-dulhan-lehenga", name: "Shahi Dulhan Lehenga", category: "Bridal", retail: 175000, fabric: "Velvet · Polki", color: "Burgundy", image: product8, badge: "Couture" },
  { slug: "emerald-festive-anarkali", name: "Emerald Festive Anarkali", category: "Reception", retail: 68000, fabric: "Silk · Embroidery", color: "Emerald Green", image: product9 },
  { slug: "royal-bridal-lehenga", name: "Royal Bridal Lehenga", category: "Bridal", retail: 165000, fabric: "Silk · Zari Work", color: "Peacock Blue", image: product10, badge: "Exclusive" },
  { slug: "golden-grace-saree", name: "Golden Grace Saree", category: "Saree", retail: 52000, fabric: "Banarasi Silk", color: "Golden Yellow", image: product11 },
  { slug: "rose-pink-mehendi", name: "Rose Pink Mehendi Set", category: "Mehendi", retail: 38000, fabric: "Georgette · Gota", color: "Rose Pink", image: product12 },
  { slug: "burgundy-celebration-lehenga", name: "Burgundy Celebration Lehenga", category: "Bridal", retail: 155000, fabric: "Velvet · Resham", color: "Deep Burgundy", image: product13, badge: "Premium" },
];

export const COLLECTIONS = [
  { slug: "bridal", title: "Bridal Lehengas", image: bridal, tagline: "The Dulhan Edit" },
  { slug: "sarees", title: "Designer Sarees", image: saree, tagline: "Drape Heritage" },
  { slug: "lehengas", title: "Reception Looks", image: reception, tagline: "Modern Couture" },
  { slug: "haldi", title: "Haldi Collection", image: haldi, tagline: "Sunlit Mornings" },
  { slug: "mehendi", title: "Mehendi Edit", image: mehendi, tagline: "Garden Soirée" },
  { slug: "rentals", title: "Rental Atelier", image: rentals, tagline: "Curated Pieces" },
];
