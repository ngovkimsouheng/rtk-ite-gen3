"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/table-data" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full bg-white shadow-2xs border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-gray-800">
          MyStore
        </Link>

        {/* Menu */}
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-200

                ${
                  isActive(item.href)
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
