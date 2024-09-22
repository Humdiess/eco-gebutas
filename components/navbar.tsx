'use client'

import Link from "next/link"; 
import { cn } from "@/lib/utils";
import { Video, Star, Info, MessageSquare, ShoppingCart } from "lucide-react"; 
import { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    { href: "#video", label: "Video", icon: <Video className="h-6 w-6 block md:hidden" /> },
    { href: "#fitur", label: "Fitur", icon: <Star className="h-6 w-6 block md:hidden" /> },
    { href: "#tentang", label: "Tentang", icon: <Info className="h-6 w-6 block md:hidden" /> },
    { href: "#testimoni", label: "Testimoni", icon: <MessageSquare className="h-6 w-6 block md:hidden" /> },
    { href: "/products", label: "Produk", icon: <ShoppingCart className="h-6 w-6 block md:hidden" /> },
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
          <nav className="block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index} className="group">
                  <Link href={item.href} className="text-gray-600 hover:text-gray-900 transition-colors flex flex-col items-center">
                    {item.icon}
                    <span className="nav-text hidden md:block">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
