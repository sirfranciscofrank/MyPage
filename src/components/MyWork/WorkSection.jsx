import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

export default function MyWork() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  return (
    <section ref={ref} className="min-h-screen py-40 px-12 overflow-hidden flex flex-col justify-center">
      <motion.div style={{ scale, opacity }} className="origin-center">
        <div className="flex justify-between items-start gap-12">
          {/* Left — heading block */}
          <div className="flex items-end gap-12">
            <h2 className="text-[20rem] font-extrabold leading-none font-['Ubuntu']">My</h2>
            <p className="mb-10 tracking-[0.4em] text-[20px] uppercase text-black [writing-mode:vertical-rl] rotate-180">
              ALL OF MY WORKS
            </p>
          </div>

          {/* Right — text fills the void */}
          <div className="max-w-md mt-24 shrink-0">
            <p className="text-2xl leading-relaxed font-['Ubuntu'] text-black font-bold">
              Everything here started as something I wanted to understand.
            </p>

            <RevealText
              className="flex flex-wrap mt-6 text-lg leading-relaxed"
              text="I'm self-teaching my way through the full stack — designing interfaces, writing the code behind them, and figuring out the parts in between. These projects are where the learning shows up."
            />

            <RevealText
              className="inline-flex flex-wrap mt-6 text-lg leading-relaxed px-5 py-3 bg-black rounded-[10px] translate-y-[10rem]"
              from="#6b7280"
              to="#ffffff"
              text="Scroll down to see what I've made so far."
            />
          </div>
        </div>

        <RevealText
          className="flex flex-wrap text-[15rem] font-extrabold font-['Ubuntu'] leading-none"
          text="Work"
        />
      </motion.div>
    </section>
  );
}