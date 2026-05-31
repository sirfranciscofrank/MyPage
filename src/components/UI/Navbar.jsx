import webicon from "../../assets/images/webicon.png";
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { useState } from "react"

function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 50) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      className="font-['Ubuntu']"
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <nav className="flex items-center py-4 px-12">
        <div className="flex items-center gap-2 flex-1">
          <img src={webicon} alt="logo" className="w-6 h-12 -translate-y-[5px]" />
          <span className="text-2xl font-extrabold tracking-wide">
            SirFranciscoFrank
          </span>
        </div>
        <ul className="flex gap-10 font-medium">
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">Work</a>
          </li>
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">Stack</a>
          </li>
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">About Me</a>
          </li>
        </ul>
        <div className="flex-1 flex justify-end">
          <a
            href="#contact"
            className="bg-[#000401] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:scale-90 active:scale-70 transition-transform duration-200 ease-out"
          >
            Contact Me
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
export default Navbar;
