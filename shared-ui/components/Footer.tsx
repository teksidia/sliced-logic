export const Footer = () => (
  <footer className="bg-black text-white px-6 py-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm text-gray-400">
        © 2026 Your Company. All rights reserved.
      </span>
      <ul className="flex gap-6 text-sm text-gray-400">
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </li>
      </ul>
    </div>
  </footer>
);
