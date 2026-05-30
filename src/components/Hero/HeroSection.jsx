function HeroSection() {
  return (
    <section className="py-15 max-w-7xl mx-auto min-h-100 flex items-center justify-center">
      <div className="text-center max-w-3xl">
        <blockquote className="text-[4.9rem] font-bold leading-tight flex flex-col items-center text-left">
          <p className="text-sm font-normal tracking-widest uppercase text-gray-500 mb-4">// <span className="status-dot"></span><span className="text-green-600">available for work</span> · FRONTEND DEVELOPER</p>
         
          <h1 className="font-[' JetBrains_Mono']">BBA by degree.</h1>
          <h1 className="font-[' JetBrains_Mono']">Developer by choice.</h1>
          <span
            className="text-5xl leading-none mt-1"
            style={{ WebkitTextStroke: "2px black", color: "transparent" }}
          >
            ---------
          </span>
        </blockquote>
        <div className="flex flex-row text-center items-center translate-x-20">
          <p className="mt-6 text-xl text-gray-600">
            Self-teaching <span className="font-bold text-black">Full-Stack development</span> one project at a time.
          </p>
          <p className="mt-2 text-black font-bold">— Francis</p>
        </div>
        <button className="mt-10 px-8 py-3 border-2 border-black bg-black text-white font-semibold text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:scale-90 active:scale-70 transition-all duration-200 ease-out cursor-pointer">
          View My Work ↓
        </button>
      </div>
    </section>
  );
}
export default HeroSection;
