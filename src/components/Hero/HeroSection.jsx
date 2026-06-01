import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const particleOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.22]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 55 + Math.random() * 42,
        size: Math.random() * 3 + 1.5,
        dy: Math.random() * 8 + 4,
        dx: (Math.random() - 0.5) * 6,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <section ref={ref} className="relative py-12 md:py-15 px-4 max-w-7xl mx-auto min-h-100 flex items-center justify-center overflow-hidden">

      <motion.div
        style={{ opacity: particleOpacity, y: particleY }}
        className="absolute inset-0 pointer-events-none"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{ y: [0, -p.dy, 0], x: [0, p.dx, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            className="absolute rounded-full bg-black"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          />
        ))}
      </motion.div>

      <div className="text-center max-w-3xl">
        <blockquote className="text-[2.4rem] sm:text-[3.5rem] md:text-[4.6rem] font-bold leading-tight flex flex-col items-center text-left">
          <p className="text-sm font-normal tracking-widest uppercase text-gray-500 mb-4">
            // <span className="status-dot"></span>
            <span className="text-green-600">available for work</span> ·
            WEB DEVELOPER
          </p>

          <h1 className="font-[' JetBrains_Mono']">BBA by Degree.</h1>
          <h1 className="font-[' JetBrains_Mono']">Developer by <span className="relative inline-block cursor-default transition-all duration-300 ease-out hover:-skew-x-6 hover:italic group">
              CHOICE
              <span className="absolute inset-0 bg-green-400/25 -skew-x-6 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out -z-10 px-1 -mx-1"></span>
            </span>.</h1>
        </blockquote>
        <div className="flex flex-col sm:flex-row text-center items-center sm:translate-x-20">
          <p className="mt-6 text-xl text-gray-600">
            Self-teaching{" "}
            <span className="font-bold text-[#000401]">Full-Stack development</span>{" "}
            one project at a time.
          </p>
          <p className="mt-2 text-[#000401] font-bold">— Francis</p>
        </div>
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative mt-10 px-12 py-4 border-2 border-[#000401] bg-[#000401] text-white font-semibold text-sm tracking-widest uppercase hover:bg-gray-900 hover:scale-90 active:scale-70 transition-all duration-200 ease-out cursor-pointer overflow-hidden"
        >
          <span className="transition-all duration-200 group-hover:opacity-0 group-hover:translate-y-2">
            View Projects ↓
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-mono tracking-widest opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            // jump to showcase ↓
          </span>
        </button>
      </div>
    </section>
  );
}
export default HeroSection;
