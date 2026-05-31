const VERTICAL_LABEL = Array(30).fill("WHO I AM").join("  ·  ");

export default function AboutMeSeperator() {
  return (
    <section className="relative py-24 px-12 overflow-hidden flex flex-col justify-center bg-white">
      <div className="flex items-end gap-12">
        <h2 className="text-[10rem] font-extrabold leading-none font-['Ubuntu'] -translate-x-8">
          About Me{" "}
          <span className="[-webkit-text-stroke:2px_black] text-transparent font-extrabold inline-block [animation:float-bounce_2.4s_cubic-bezier(0.36,0.07,0.19,0.97)_infinite]">
            LET'S FIND OUT
          </span>
        </h2>
        <p className="mb-10 tracking-[0.4em] text-[20px] uppercase text-black [writing-mode:vertical-rl] rotate-180 select-none">
          {VERTICAL_LABEL}
        </p>
      </div>
    </section>
  );
}
