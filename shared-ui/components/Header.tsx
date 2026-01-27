import React from "react";

interface HeaderProps {
  logo?: React.ReactNode;
}

export const Header = ({ logo = <h1>🥜 Disco Peanut</h1> }: HeaderProps) => (
  <header className="sticky top-0 z-50 bg-black text-white px-6 py-4">
    <nav className="max-w-7xl mx-auto flex items-center justify-between">
      <span className="text-xl font-semibold">{logo}</span>
      <ul className="flex gap-6 text-sm">
        <li>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300 transition-colors">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
);
