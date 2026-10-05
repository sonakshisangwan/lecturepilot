export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-6">

      <h1 className="text-3xl font-extrabold tracking-tight">
        LecturePilot
      </h1>

      <div className="hidden md:flex gap-10 text-gray-300">
        <a href="#" className="hover:text-white transition">Features</a>
        <a href="#" className="hover:text-white transition">How it Works</a>
        <a href="#" className="hover:text-white transition">Demo</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-semibold">
        Get Started
      </button>

    </nav>
  );
}