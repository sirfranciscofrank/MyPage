import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function WorkCollection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="min-h-screen bg-black"
    >
      <div className="relative">
        <div className="absolute -top-8 left-0 flex items-center gap-4">
          <span className="text-[8rem] font-black text-white/5 leading-none select-none uppercase">
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
    </motion.section>
  );
}

export default WorkCollection;
