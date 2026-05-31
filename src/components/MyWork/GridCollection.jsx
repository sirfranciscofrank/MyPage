import { useState } from "react";
import { motion } from "framer-motion";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TAG_ICONS = {
  "HTML":         `${DI}/html5/html5-original.svg`,
  "CSS":          `${DI}/css3/css3-original.svg`,
  "JavaScript":   `${DI}/javascript/javascript-original.svg`,
  "TypeScript":   `${DI}/typescript/typescript-original.svg`,
  "Next.js":      `${DI}/nextjs/nextjs-original.svg`,
  "React":        `${DI}/react/react-original.svg`,
  "Tailwind CSS": `${DI}/tailwindcss/tailwindcss-original.svg`,
  "Node.js":      `${DI}/nodejs/nodejs-original.svg`,
  "Python":       `${DI}/python/python-original.svg`,
  "Vue":          `${DI}/vuejs/vuejs-original.svg`,
  "MongoDB":      `${DI}/mongodb/mongodb-original.svg`,
  "PostgreSQL":   `${DI}/postgresql/postgresql-original.svg`,
  "Firebase":     `${DI}/firebase/firebase-original.svg`,
};

const INVERT = new Set(["Next.js"]);

function TagIcon({ name }) {
  const [failed, setFailed] = useState(false);
  const src = TAG_ICONS[name];

  if (!src || failed) return <div className="w-3.5 h-3.5 bg-white shrink-0" />;

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-3.5 h-3.5 object-contain shrink-0"
      style={INVERT.has(name) ? { filter: "invert(1)" } : undefined}
    />
  );
}

const cardEntrance = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.08 } },
};

function Tag({ name }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] text-white border-2 border-white px-2 py-1 tracking-widest uppercase">
      <TagIcon name={name} />
      {name}
    </span>
  );
}

function ProjectCard({ num, name, description, url, github, tags, status }) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ outline: "3px solid #ffffff", scale: 1.15, transition: { duration: 0.18, ease: "easeOut" } }}
      className="flex flex-col p-6 bg-black min-h-72"
    >
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-7xl font-black text-white leading-none select-none">
          {num}
        </span>
        <div className="flex items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-black bg-white border-2 border-white px-3 py-1.5 tracking-widest uppercase transition-none hover:bg-black hover:text-white hover:border-white"
            >
              Live ↗
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-black bg-white border-2 border-white px-3 py-1.5 tracking-widest uppercase transition-none hover:bg-black hover:text-white hover:border-white"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="text-white font-black text-xl uppercase tracking-wide">{name}</h3>
          {status && (
            <span className="font-mono text-[9px] px-2 py-1 tracking-widest uppercase border-2 border-white text-white leading-none shrink-0">
              {status}
            </span>
          )}
        </div>
        <p className="text-white text-sm mb-5 leading-snug line-clamp-2 min-h-10">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
          {tags.length > 3 && (
            <span className="font-mono flex items-center text-[10px] text-white border-2 border-white px-2 py-1 tracking-widest uppercase">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderCard({ num }) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ outline: "3px solid #ffffff", scale: 1.15, transition: { duration: 0.18, ease: "easeOut" } }}
      className="flex flex-col justify-between p-6 bg-black min-h-72"
    >
      <span className="font-mono text-7xl font-black text-white leading-none select-none">
        {num}
      </span>
      <span className="font-mono text-[6rem] text-white px-2.5 tracking-widest uppercase self-center items-center">
        N/A
      </span>
      <div />
    </motion.div>
  );
}

function GridCollection({ projects = [] }) {
  const slots = [...projects];
  while (slots.length < 3 || slots.length % 3 !== 0) slots.push(null);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-white border-2 border-white">
        {slots.map((project, i) =>
          project ? (
            <ProjectCard
              key={project.id}
              num={String(i + 1).padStart(2, "0")}
              {...project}
            />
          ) : (
            <PlaceholderCard key={`placeholder-${i}`} num={String(i + 1).padStart(2, "0")} />
          )
        )}
      </div>
      <p className="font-bold text-[7rem] text-white tracking-widest uppercase text-center ">More is <span className="text-[60px]">COMING SOON!</span></p>
    </div>
  );
}

export default GridCollection;
