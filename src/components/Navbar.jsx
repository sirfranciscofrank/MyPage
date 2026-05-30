function Navbar() {
  return (
    <header className="font-['Ubuntu'] font-bold">
      <nav className="flex items-center py-4 px-12">
        <span className="text-lg flex-1">SirFrancisoFrank</span>
        <ul className="flex gap-10">
          <li><a href="" className="">Work</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Contact</a></li>
        </ul>
        <div className="flex-1" /> {/* ghost div — mirrors the brand width */}
      </nav>
    </header>
  );
}
export default Navbar;
