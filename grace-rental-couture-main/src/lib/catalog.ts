export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  retail: number;
  duration: string;
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

export const PRODUCTS: Product[] = [
  { slug: "rani-zardozi-lehenga", name: "Rani Zardozi Lehenga", category: "Bridal", price: 18500, retail: 145000, duration: "4 Days", fabric: "Raw Silk · Zardozi", color: "Maroon", image: bridal, badge: "Signature" },
  { slug: "noor-banarasi-saree", name: "Noor Banarasi Saree", category: "Saree", price: 6500, retail: 48000, duration: "3 Days", fabric: "Pure Banarasi Silk", color: "Wine", image: saree, badge: "New" },
  { slug: "gulnaaz-reception", name: "Gulnaaz Reception Lehenga", category: "Reception", price: 12500, retail: 92000, duration: "4 Days", fabric: "Organza · Sequin", color: "Nude Pink", image: reception },
  { slug: "marigold-haldi-set", name: "Marigold Haldi Set", category: "Haldi", price: 4800, retail: 32000, duration: "2 Days", fabric: "Cotton Silk", color: "Mustard", image: haldi },
  { slug: "zara-mehendi-anarkali", name: "Zara Mehendi Anarkali", category: "Mehendi", price: 5400, retail: 36000, duration: "3 Days", fabric: "Georgette · Gota", color: "Emerald", image: mehendi, badge: "Trending" },
  { slug: "shaan-velvet-anarkali", name: "Shaan Velvet Anarkali", category: "Reception", price: 9800, retail: 72000, duration: "3 Days", fabric: "Velvet · Resham", color: "Crimson", image: celeb },
  { slug: "heritage-edit-saree", name: "Heritage Edit Saree", category: "Saree", price: 5800, retail: 39000, duration: "3 Days", fabric: "Tussar · Zari", color: "Champagne", image: rentals },
  { slug: "shahi-dulhan-lehenga", name: "Shahi Dulhan Lehenga", category: "Bridal", price: 22000, retail: 175000, duration: "5 Days", fabric: "Velvet · Polki", color: "Burgundy", image: bridal, badge: "Couture" },
];

export const COLLECTIONS = [
  { slug: "bridal", title: "Bridal Lehengas", image: bridal, tagline: "The Dulhan Edit" },
  { slug: "sarees", title: "Designer Sarees", image: saree, tagline: "Drape Heritage" },
  { slug: "lehengas", title: "Reception Looks", image: reception, tagline: "Modern Couture" },
  { slug: "rentals", title: "Haldi Collection", image: haldi, tagline: "Sunlit Mornings" },
  { slug: "rentals", title: "Mehendi Edit", image: mehendi, tagline: "Garden Soirée" },
  { slug: "rentals", title: "Rental Atelier", image: rentals, tagline: "Curated Pieces" },
];
