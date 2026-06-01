import webicon from "../../assets/images/webicon.png";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"
import { useState } from "react"

const NAV_LINKS = [
  { label: "Work",     id: "projects" },
  { label: "Stack",    id: "stack"    },
  { label: "About Me", id: "resume"   },
  { label: "Contact",  id: "contact"  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 50) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  function handleNav(id) {
    setOpen(false)
    setTimeout(() => scrollTo(id), 300)
  }

  return (
    <>
      <motion.header
        className="font-['Ubuntu'] fixed top-0 left-0 right-0 z-50 bg-[#EFEDEA]/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <nav className="flex items-center py-4 px-6 md:px-12">
          <div className="flex items-center gap-2 flex-1">
            <img src={webicon} alt="logo" className="w-6 h-12 -translate-y-[5px]" />
            <span className="text-2xl font-extrabold tracking-wide">
              SirFranciscoFrank
            </span>
          </div>

          <ul className="hidden md:flex gap-10 font-medium">
            {NAV_LINKS.slice(0, 3).map(({ label, id }) => (
              <li key={id} className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-1 justify-end">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              className="bg-[#000401] text-white text-sm font-bold px-6 py-2.5 hover:scale-90 active:scale-70 transition-transform duration-200 ease-out"
            >
              Contact Me
            </a>
          </div>

          <button
            className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 origin-center"
              animate={open ? { rotate: 45, y: 8, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-black"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-6 h-0.5 origin-center"
              animate={open ? { rotate: -45, y: -8, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-start px-10 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-10 w-full">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.25 }}
                >
                  <button
                    onClick={() => handleNav(id)}
                    className="text-white text-5xl font-extrabold uppercase tracking-widest hover:text-white/50 transition-colors duration-150 cursor-pointer text-left w-full"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <p className="absolute bottom-10 left-10 text-white/20 font-mono text-xs tracking-widest uppercase">
              SIRFRANCISCOFRANK © 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navbar;
