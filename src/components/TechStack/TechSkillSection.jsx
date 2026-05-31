import { useState } from "react";

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

function TechGroup({ label, items }) {
  return (
    <div>
      <p className="font-mono text-neutral-400 text-sm tracking-[0.4em] uppercase mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 max-w-100">
        {items.map((name) =>
          name === "MORE" ? (
            <span
              key={name}
              className="px-4 py-2 font-mono text-black text-xs tracking-widest uppercase font-medium rounded-full" style={{ backgroundColor: "#EFEDEA" }}
            >
              + MORE
            </span>
          ) : (
            <TechBadge key={name} name={name} />
          )
        )}
      </div>
    </div>
  );
}

function TechSkill() {
  return (
    <section
      id="stack"
      className="bg-black px-10 py-20 flex flex-row items-start gap-16"
    >
      <div className="flex-1 text-left">
        <p className="text-neutral-400 text-sm tracking-[0.4em] uppercase mb-2">MY TOOLS</p>
        <h1 className="text-white font-bold text-[6rem] tracking-tight leading-none">WHAT I USE</h1>
        <h1 className="text-white font-bold text-[6rem] tracking-tight leading-none">TO BUILD</h1>
        <h1 className="text-white font-bold text-[6rem] tracking-tight leading-none">MY PROJECTS?</h1>
      </div>

      <div className="shrink-0 pt-6 flex flex-col gap-10">
        <TechGroup label="PROFICIENT" items={ARSENAL} />
        <TechGroup label="LEARNING..." items={IN_TRAINING} />
      </div>
    </section>
  );
}

export default TechSkill;
