"use client"
import React from 'react';
import Link from 'next/link'; // If you're using Next.js routing

const Header = () => {
  return (
    <header className="w-full bg-[#111417] shadow border-b border-[#eaedef]/50 sticky top-0 z-20 transition-all">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo or Application Title */}
        <div className="text-2xl font-bold text-[#eaedef]">
          <Link href="/">
            ZoomCraft
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 text-[#eaedef]">
          <Link href="/">
            Home
          </Link>
          <Link href="/about">
            About
          </Link>
          <Link href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
