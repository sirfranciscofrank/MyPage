import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Word-by-word scroll-driven color reveal ────────────────────────────────
// Same pattern used in TechSkillSection and Resume — keeps motion language
// consistent across the whole portfolio.
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

// ─── Single contact row ──────────────────────────────────────────────────────
function ContactRow({ label, value, href }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    // Stop the click from navigating via the parent anchor
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      draggable
      className="flex justify-between items-center px-0 py-6 border-b border-black group cursor-pointer"
      whileHover={{ backgroundColor: "#000000", color: "#ffffff" }}
      transition={{ duration: 0.1, ease: "linear" }}
    >
      {/* Narrow mono label */}
      <span className="w-24 text-[10px] font-mono tracking-widest uppercase text-black/80 group-hover:text-white/40 transition-colors duration-100 shrink-0">
        {label}
      </span>

      {/* Value — select-text so users can highlight and copy manually */}
      <span className="flex-1 text-sm font-bold uppercase tracking-wide select-text">
        {value}
      </span>

      {/* Copy button — appears on row hover, stopPropagation keeps the anchor from firing */}
      <button
        onClick={handleCopy}
        className="ml-4 text-[10px] font-mono tracking-widest uppercase border border-current px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-copy shrink-0"
      >
        {copied ? "COPIED!" : "COPY"}
      </button>

      {/* Arrow */}
      <motion.span
        className="ml-4 text-xl shrink-0"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────
export default function ContactMe() {
  return (
    <section id="contact" className="px-12 py-24 bg-white">

      {/* Section entry — fades in once as it enters viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-8"
      >

        {/* Section label — same style as Resume "— WHO AM I —" */}
        <p className="font-mono tracking-[0.5em] uppercase text-black/80 text-xs">
          — LET'S TALK —
        </p>

        {/* Headline — staggered size contrast, same reveal as other sections.
            "HAVE A PROJECT?" fades in small, "LET'S BUILD." crashes in massive.
            Offset values chosen so the reveal completes before rows come into view. */}
        <div className="flex flex-col gap-0">
          <RevealLine
            text="HAVE A PROJECT?"
            from="#d4d4d4"
            to="#000000"
            offset={["start 0.9", "start 0.72"]}
            className="font-bold text-[2.5rem] leading-tight flex flex-wrap"
          />
          <RevealLine
            text="LET'S BUILD."
            from="#d4d4d4"
            to="#000000"
            offset={["start 0.88", "start 0.62"]}
            className="font-extrabold text-[4.5rem] leading-none flex flex-wrap"
          />
        </div>

        {/* Contact rows — border-top closes the table visually at the top */}
        <div className="border-t border-black mt-4">
          <ContactRow
            label="EMAIL"
            value="sirfrancisco2003@gmail.com"
            href="https://mail.google.com/mail/?view=cm&to=sirfrancisco2003@gmail.com"
          />
          <ContactRow
            label="GITHUB"
            value="github.com/sirfranciscofrank"
            href="https://github.com/sirfranciscofrank"
          />
          <ContactRow
            label="LINKEDIN"
            value="linkedin.com/in/suphakit-saengsawang"
            href="https://www.linkedin.com/in/suphakit-saengsawang-034378401/"
          />
        </div>

        {/* Footer — sits at the very bottom of the page.
            mt-16 separates it clearly from the last row.
            text-black/80 keeps it recessive — information, not design. */}
        <div className="mt-16 pt-6 border-t border-black/10 flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-black/80">
            SIRFRANCISCOFRANK © 2026
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-black/80">
            BUILT WITH REACT · VITE · TAILWIND
          </span>
        </div>

      </motion.div>
    </section>
  );
}
