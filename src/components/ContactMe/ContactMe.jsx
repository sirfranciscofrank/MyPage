import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

function ContactRow({ label, value, href }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex items-center gap-3 py-5 border-b border-black">
      <span className="w-16 sm:w-24 text-[10px] font-mono tracking-widest uppercase text-black/50 shrink-0">
        {label}
      </span>

      <span className="flex-1 text-xs sm:text-sm font-bold uppercase tracking-wide min-w-0 truncate">
        {value}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase border border-black px-2 sm:px-3 py-1.5 hover:bg-black hover:text-white transition-colors duration-100 cursor-copy whitespace-nowrap"
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase border border-black px-2 sm:px-3 py-1.5 bg-black text-white hover:bg-white hover:text-black transition-colors duration-100 whitespace-nowrap"
        >
          OPEN ↗
        </a>
      </div>
    </div>
  );
}

export default function ContactMe() {
  return (
    <section id="contact" className="px-6 py-16 md:px-12 md:py-24 bg-white">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-8"
      >

        <p className="font-mono tracking-[0.5em] uppercase text-black/80 text-xs">
          — LET'S TALK —
        </p>

        <div className="flex flex-col gap-0">
          <RevealLine
            text="HAVE A PROJECT?"
            from="#d4d4d4"
            to="#000000"
            offset={["start 0.9", "start 0.72"]}
            className="font-bold text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] leading-tight flex flex-wrap"
          />
          <RevealLine
            text="LET'S BUILD."
            from="#d4d4d4"
            to="#000000"
            offset={["start 0.88", "start 0.62"]}
            className="font-extrabold text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] leading-none flex flex-wrap"
          />
        </div>

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

        <div className="mt-16 pt-6 border-t border-black/10 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-black/80">
            SIRFRANCISCOFRANK © 2026
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-black/50">BUILT WITH</span>
            {[
              { name: "REACT",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "VITE",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
              { name: "TAILWIND", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            ].map(({ name, src }) => (
              <span key={name} className="flex items-center gap-1">
                <img src={src} alt={name} className="w-3.5 h-3.5 object-contain" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-black/80">{name}</span>
              </span>
            ))}</div>
        </div>

      </motion.div>
    </section>
  );
}
