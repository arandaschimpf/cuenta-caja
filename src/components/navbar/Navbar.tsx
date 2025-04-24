"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[var(--navbar-height)] bg-background border-t border-secondary/20 z-50">
      <div className="max-w-md mx-auto h-full flex items-center justify-around px-4">
        <NavItem
          href="/"
          icon="cash-register"
          label="Caja"
          active={pathname === "/"}
        />
        <NavItem
          href="/transaction"
          icon="exchange"
          label="Transaction"
          active={pathname === "/transaction"}
        />
      </div>
    </nav>
  );
}
