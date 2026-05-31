import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GridCollection from "./GridCollection";
import { projects } from "../../data/projects";

function WorkCollection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.section
      id="projects"
      ref={ref}
      style={{ opacity }}
      className="min-h-screen bg-black pt-10 px-10"
    >
      <div className="relative">
        <div className="absolute -top-8 left-0 flex items-center gap-4">
          <span className="text-[8rem] font-black text-white/60 italic leading-none select-none uppercase">
            Collection
          </span>
          <div className="flex items-center px-5 h-10 bg-white">
            <p className="text-black text-xs font-black tracking-[0.3em] uppercase">Update 5/2026</p>
          </div>
        </div>
        <p className="text-neutral-400 text-sm tracking-[0.4em] uppercase mb-2">
          Welcome to
        </p>
        <h1 className="relative text-white font-bold text-5xl tracking-tight">
          My Collection
        </h1>
      </div>

      <div className="mt-16 w-full">
        <GridCollection projects={projects} />
      </div>
    </motion.section>
    
  );
}

export default WorkCollection;
