function Navbar() {
  return (
    <header className="font-['Ubuntu'] ">
      <nav className="flex items-center py-4 px-12">
        <span className="text-2xl flex-1 font-extrabold tracking-wide">
          SirFrancisoFrank
        </span>
        <ul className="flex gap-10 font-medium">
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">Work</a>
          </li>
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">About</a>
          </li>
          <li className="hover:underline hover:scale-90 active:scale-70 transition-transform duration-200 ease-out">
            <a href="">Contact</a>
          </li>
        </ul>
        <div className="flex-1 flex justify-end">
          <a
            href="#contact"
            className="bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full hover:scale-90 active:scale-70 transition-transform duration-200 ease-out"
          >
            Contact Me
          </a>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
