import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { motion } from "framer-motion";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden bg-[var(--champagne)]">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
            />
          </div>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[var(--burgundy)] text-[var(--gold)] text-[9px] tracking-[0.3em] uppercase px-3 py-1.5">
              {product.badge}
            </span>
          )}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500">
            <button className="w-9 h-9 bg-[var(--cream)]/95 text-[var(--burgundy)] flex items-center justify-center hover:bg-[var(--gold)]"><Heart size={15} /></button>
            <button className="w-9 h-9 bg-[var(--cream)]/95 text-[var(--burgundy)] flex items-center justify-center hover:bg-[var(--gold)]"><Eye size={15} /></button>
          </div>
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[var(--burgundy)]/95 text-[var(--cream)] text-center py-3 text-[11px] tracking-[0.28em] uppercase">
            Quick View
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="label-eyebrow text-[var(--gold)]">{product.category}</p>
          <h3 className="text-display text-xl text-[var(--burgundy)] italic mt-1">{product.name}</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">{product.fabric}</p>
          <div className="mt-2 flex items-center justify-center gap-3 text-sm">
            <span className="text-[var(--burgundy)] font-medium">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-[10px] text-[var(--muted-foreground)] tracking-widest uppercase">/ {product.duration}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
