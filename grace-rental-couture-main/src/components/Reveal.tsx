import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <span className="gold-divider label-eyebrow">{eyebrow}</span>
      <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-[var(--burgundy)] mt-4 italic font-light">
        {title}
      </h2>
      {sub && <p className="text-[var(--muted-foreground)] mt-4 leading-relaxed">{sub}</p>}
    </div>
  );
}
