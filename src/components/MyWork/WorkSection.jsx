import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Word({ children, progress, range, from, to }) {
  const color = useTransform(progress, range, [from, to]);
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

function RevealText({
  text,
  className = "",
  from = "#d4d4d4",
  to = "#171717",
  offset = ["start 0.9", "start 0.7"],
}) {
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

function GrainOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      style={{ opacity: 0.07, mixBlendMode: "overlay" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="wk-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch">
          <animate attributeName="seed" from="0" to="100" dur="0.5s" repeatCount="indefinite" />
        </feTurbulence>
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#wk-grain)" />
    </svg>
  );
}

export default function MyWork() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 1.22]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 35, mass: 1 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(rawY, { stiffness: 80, damping: 28, mass: 1 });

  const blurAmount = useTransform(scrollYProgress, [0, 0.35], [8, 0]);
  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.82], [0, 1]);

  const particleOpacity = useTransform(scrollYProgress, [0.15, 0.62], [0, 0.42]);
  const particleY = useTransform(scrollYProgress, [0, 1], [30, -60]);

  const particles = useMemo(
    () =>
      Array.from({ length: 58 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        dy: Math.random() * 14 + 6,
        dx: (Math.random() - 0.5) * 10,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2.5,
      })),
    []
  );

  return (
    <section ref={ref} className="relative min-h-[250vh] py-40 px-12 overflow-hidden flex flex-col justify-center">
      <motion.div
        style={{ opacity: particleOpacity, y: particleY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
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

      <motion.div style={{ scale, opacity, y, filter }} className="origin-center relative z-1">
        <div className="flex justify-between items-start gap-12">
          {/* Left — heading block */}
          <div className="flex items-end gap-12">
            <motion.h2
              animate={{ y: [0, -22, 0], x: [0, 7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[20rem] font-extrabold leading-none font-['Ubuntu']"
            >
              My
            </motion.h2>
            <motion.p
              animate={{ y: [0, -14, 0], x: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="mb-10 tracking-[0.4em] text-[20px] uppercase text-black [writing-mode:vertical-rl] rotate-180"
            >
              ALL OF MY WORKS
            </motion.p>
          </div>

          {/* Right — text fills the void */}
          <div className="max-w-md mt-24 shrink-0">
            <motion.p
              animate={{ y: [0, -16, 0], x: [0, -5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="text-2xl leading-relaxed font-['Ubuntu'] text-black font-bold"
            >
              Everything here started as something I wanted to understand.
            </motion.p>

            <motion.div
              animate={{ y: [0, -13, 0], x: [0, 4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <RevealText
                className="flex flex-wrap mt-6 text-lg leading-relaxed"
                text="I'm self-teaching my way through the full stack — designing interfaces, writing the code behind them, and figuring out the parts in between. These projects are where the learning shows up."
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -18, 0], x: [0, 5, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              className="mt-6 translate-y-40 border border-black font-mono"
            >
              <div className="flex items-center gap-1.5 px-3 py-2 bg-black border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="bg-black px-5 py-4 flex items-start gap-2">
                <span className="text-green-400 select-none shrink-0">$</span>
                <RevealText
                  className="inline-flex flex-wrap text-sm leading-relaxed"
                  from="#4b5563"
                  to="#e5e7eb"
                  text="Scroll down to see what I've made so far."
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0], x: [0, -6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <RevealText
            className="flex flex-wrap text-[15rem] font-extrabold font-['Ubuntu'] leading-none"
            text="Work"
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none z-20"
      />

      <GrainOverlay />

    </section>
  );
}