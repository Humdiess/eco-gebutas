'use client'

import Link from "next/link"; 
import { cn } from "@/lib/utils";
import { Leaf, Menu } from "lucide-react"; 
import { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: "#video", label: "Video" },
    { href: "#fitur", label: "Fitur" },
    { href: "#tentang", label: "Tentang" },
    { href: "#testimoni", label: "Testimoni" },
    { href: "/products", label: "Produk" },
  ];

  return (
    <div className="navbar">
      <header
        className={cn(
          "fixed left-1/2 top-4 z-50 transition-all duration-300 ease-in-out transform -translate-x-1/2", // Centered navbar
          isNavbarVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        )}
        style={{ width: 'fit-content' }} // Fit-content width
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-300 py-4 px-6 flex justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <Image src="/img/gebutas-logo.png" alt="logo" width={40} height={40} />
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">ECO Gebutas</span>
              </div>
              <button
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
