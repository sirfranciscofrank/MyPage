import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TECH_ICONS = {
  "HTML":         `${DI}/html5/html5-original.svg`,
  "CSS":          `${DI}/css3/css3-original.svg`,
  "Tailwind CSS": `${DI}/tailwindcss/tailwindcss-original.svg`,
  "Vite":         `${DI}/vitejs/vitejs-original.svg`,
  "Git":          `${DI}/git/git-original.svg`,
  "JavaScript":   `${DI}/javascript/javascript-original.svg`,
  "React":        `${DI}/react/react-original.svg`,
  "Next.js":      `${DI}/nextjs/nextjs-original.svg`,
  "TypeScript":   `${DI}/typescript/typescript-original.svg`,
};

const INVERT = new Set(["Next.js"]);

const ARSENAL = ["HTML", "CSS", "Tailwind CSS", "Vite", "Git"];
const IN_TRAINING = ["JavaScript", "React", "Next.js", "TypeScript", "MORE"];

function Word({ children, progress, range, from, to }) {
  const color = useTransform(progress, range, [from, to]);
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.15em]">
      {children}
    </motion.span>
  );
}

function RevealText({ text, className = "", from = "#2a2a2a", to = "#ffffff", offset = ["start 0.9", "start 0.55"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} from={from} to={to}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function TechBadge({ name }) {
  const [failed, setFailed] = useState(false);
  const src = TECH_ICONS[name];

  return (
    <div className="flex items-center gap-2.5 border border-white/30 px-4 py-2">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="w-5 h-5 object-contain shrink-0"
          style={INVERT.has(name) ? { filter: "invert(1)" } : undefined}
        />
      ) : (
        <div className="w-5 h-5 shrink-0" />
      )}
      <span className="font-mono text-white text-xs tracking-widest uppercase font-medium">{name}</span>
    </div>
  );
}

function ScrollRevealItem({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

function TechGroup({ label, items, progress, startAt = 0, endAt = 1 }) {
  const span = endAt - startAt;
  const total = 1 + items.length;
  const rangeFor = (i) => [startAt + span * (i / total), startAt + span * ((i + 1) / total)];

  return (
    <div>
      <ScrollRevealItem progress={progress} range={rangeFor(0)}>
        <p className="font-mono text-neutral-400 text-sm tracking-[0.4em] uppercase mb-2">{label}</p>
      </ScrollRevealItem>
      <div className="flex flex-wrap gap-2 max-w-100">
        {items.map((name, i) =>
          name === "MORE" ? (
            <ScrollRevealItem key={name} progress={progress} range={rangeFor(i + 1)}>
              <span className="px-4 py-2 font-mono text-black text-xs tracking-widest uppercase font-medium rounded-full" style={{ backgroundColor: "#EFEDEA" }}>
                + MORE
              </span>
            </ScrollRevealItem>
          ) : (
            <ScrollRevealItem key={name} progress={progress} range={rangeFor(i + 1)}>
              <TechBadge name={name} />
            </ScrollRevealItem>
          )
        )}
      </div>
    </div>
  );
}

function TechSkill() {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.9", "start 0.45"],
  });

  return (
    <section
      id="stack"
      className="bg-black px-10 pt-20 pb-0 flex flex-col gap-16"
    >
      <div ref={rowRef} className="flex flex-row items-start gap-16">
        <div className="flex-1 text-left">
          <RevealText
            text="MY TOOLS"
            from="#2a2a2a"
            to="#a3a3a3"
            offset={["start 0.95", "start 0.75"]}
            className="font-mono text-sm tracking-[0.4em] uppercase mb-2 flex flex-wrap"
          />
          <RevealText
            text="WHAT I USE"
            className="font-bold text-[6rem] tracking-tight leading-none flex flex-wrap"
            offset={["start 0.9", "start 0.65"]}
          />
          <RevealText
            text="TO BUILD"
            className="font-bold text-[6rem] tracking-tight leading-none flex flex-wrap"
            offset={["start 0.88", "start 0.62"]}
          />
          <RevealText
            text="MY PROJECTS?"
            className="font-bold text-[6rem] tracking-tight leading-none flex flex-wrap"
            offset={["start 0.85", "start 0.8"]}
          />
        </div>

        <div className="shrink-0 pt-6 flex flex-col gap-10">
          <TechGroup label="PROFICIENT" items={ARSENAL}   progress={scrollYProgress} startAt={0}    endAt={0.5} />
          <TechGroup label="LEARNING..." items={IN_TRAINING} progress={scrollYProgress} startAt={0.45} endAt={1}   />
        </div>
      </div>
      <motion.div
        className="flex justify-center py-4 bg-black"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
       
      </motion.div>
      <div className="-mx-10 h-64 bg-linear-to-b from-black to-white" />
    </section>
  );
}

export default TechSkill;
