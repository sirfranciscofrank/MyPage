import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import resumePDF from "../../assets/docs/SuphakitResume.pdf";

const FACTS = [
  { label: "LOCATION",      value: "Bangkok, Thailand" },
  { label: "BACKGROUND",    value: "BBA Graduate" },
  { label: "APPROACH",      value: "Business-first, then code" },
  { label: "CURRENTLY",     value: "Self-teaching Fullstack" },
  { label: "BUILDING",      value: "BePartner · Paso & MORE " },
  { label: "LEARNING FROM", value: "The Odin Project" },
];

// Identical word-by-word color-reveal pattern from TechSkillSection
function Word({ children, progress, range, from, to }) {
  const color = useTransform(progress, range, [from, to]);
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.15em]">
      {children}
    </motion.span>
  );
}

function RevealLine({ text, className = "", from = "#d4d4d4", to = "#000000", offset }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end   = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} from={from} to={to}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

// Square photo frame — overlay snaps in/out at duration 0.1 (brutalist snap)
function PhotoCard({ photo }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-full aspect-square border-2 border-black overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photo ? (
        <img src={photo} alt="Francis" className="w-full h-full object-cover" />
      ) : (
        // Placeholder stripe pattern when no photo prop is passed
        <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
          <span className="font-mono text-black/20 text-xs tracking-widest uppercase">PHOTO</span>
        </div>
      )}
      <motion.div
        className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <span className="text-white font-extrabold text-2xl tracking-widest uppercase font-mono">
          YES, I'M REAL.
        </span>
        <span className="text-white/50 font-mono text-xs tracking-[0.5em] uppercase">
          BANGKOK, THAILAND
        </span>
      </motion.div>
    </div>
  );
}

// Each fact cell — 1px black gap between cells (via bg-black on grid wrapper) acts as border
function FactCell({ label, value }) {
  return (
    <div className="bg-white px-4 py-3">
      <p className="font-mono tracking-widest text-black/40 text-[10px] uppercase mb-1">{label}</p>
      <p className="font-bold uppercase text-black text-sm">{value}</p>
    </div>
  );
}

export default function Resume({ photo }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      id="resume"
      className="px-12 py-24 bg-white"
    >
      <div className="flex gap-16 items-start">

        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div className="w-80 shrink-0 flex flex-col gap-6">
          <PhotoCard photo={photo} />
          <div className="border-t border-black/80" />
          {/* Stacked mono label under photo for breathing room */}
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/80 select-none">
            FRANCIS · DEVELOPER
          </p>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-8">

          {/* Section label */}
          <p className="font-mono tracking-[0.5em] uppercase text-black/80 text-xs">
            — WHO AM I —
          </p>

          {/* Headline — staggered reveal, large size contrast matches stack section */}
          <div className="flex flex-col gap-0">
            <RevealLine
              text="BBA BY DEGREE."
              from="#d4d4d4"
              to="#000000"
              offset={["start 0.9", "start 0.72"]}
              className="font-bold text-[2.5rem] leading-tight flex flex-wrap"
            />
            <RevealLine
              text="BUILDER BY CHOICE."
              from="#d4d4d4"
              to="#000000"
              offset={["start 0.88", "start 0.62"]}
              className="font-extrabold text-[4.5rem] leading-none flex flex-wrap"
            />
          </div>

          {/* Story paragraph */}
          <p className="text-black/60 max-w-md leading-relaxed">
            BBA grad who got tired of spreadsheets and started building things instead.
            Self-teaching fullstack through The Odin Project and hands-on projects.
            Business brain first — I think about users and markets before I open a code editor.
          </p>

          {/* Divider */}
          <div className="border-t border-black/80" />

          {/* Facts grid — bg-black + gap-[1px] = 1px black lines between cells, no double-borders */}
          <div className="grid grid-cols-2 gap-px bg-black border border-black">
            {FACTS.map(({ label, value }) => (
              <FactCell key={label} label={label} value={value} />
            ))}
          </div>

          {/* CTA — whileHover inverts palette instantly (duration 0.1) */}
          <div className="flex gap-4">
            <motion.button
              className="px-6 py-3 bg-black text-white uppercase tracking-widest text-sm font-mono border border-black cursor-pointer"
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              transition={{ duration: 0.1, ease: "linear" }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              VIEW MY WORK 
            </motion.button>
            <motion.a
              href={resumePDF}
              download
              className="px-6 py-3 bg-white text-black uppercase tracking-widest text-sm font-mono border border-black cursor-pointer"
              whileHover={{ backgroundColor: "#000000", color: "#ffffff" }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              DOWNLOAD RESUME
            </motion.a>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
