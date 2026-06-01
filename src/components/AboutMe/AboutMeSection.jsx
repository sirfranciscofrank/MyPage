const VERTICAL_LABEL = Array(30).fill("WHO I AM").join("  ·  ");

export default function AboutMeSeperator() {
  return (
    <section className="relative py-12 px-6 md:py-24 md:px-12 overflow-hidden flex flex-col justify-center bg-white">
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
        <h2 className="text-[3rem] sm:text-[6rem] md:text-[10rem] font-extrabold leading-none font-['Ubuntu'] md:-translate-x-8">
          About Me{" "}
          <span className="[-webkit-text-stroke:2px_black] text-transparent font-extrabold inline-block [animation:float-bounce_2.4s_cubic-bezier(0.36,0.07,0.19,0.97)_infinite]">
            LET'S FIND OUT
          </span>
        </h2>
        <p className="hidden md:block mb-10 tracking-[0.4em] text-[20px] uppercase text-black [writing-mode:vertical-rl] rotate-180 select-none">
          {VERTICAL_LABEL}
        </p>
      </div>
    </section>
  );
}
