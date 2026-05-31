function HeroSection() {
  return (
    <section className="py-15 max-w-7xl mx-auto min-h-100 flex items-center justify-center">
      
      <div className="text-center max-w-3xl">
        <blockquote className="text-[4.6rem] font-bold leading-tight flex flex-col items-center text-left">
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
        <div className="flex flex-row text-center items-center translate-x-20">
          <p className="mt-6 text-xl text-gray-600">
            Self-teaching{" "}
            <span className="font-bold text-[#000401]">Full-Stack development</span>{" "}
            one project at a time.
          </p>
          <p className="mt-2 text-[#000401] font-bold">— Francis</p>
        </div>
        <button className="mt-10 px-12 py-4 border-2 border-[#000401] bg-[#000401] text-white font-semibold text-sm tracking-widest uppercase  hover:bg-gray-900 hover:scale-90 active:scale-70 transition-all duration-200 ease-out cursor-pointer">
          View Projects ↓
        </button>
      </div>
    </section>
  );
}
export default HeroSection;
