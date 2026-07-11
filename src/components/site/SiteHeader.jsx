"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company, navItems } from "./siteData";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (open || currentScrollY < 120) {
        setHidden(false);
      } else if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
        setHidden(scrollingDown);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    setHidden(false);
    setOpen(false);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="poster-shadow flex items-center justify-between gap-4 border-2 border-ink bg-paper px-3 py-2 md:px-5">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-white">
              <Image
                src="/ai-assets/swan-service-logo-small.jpg"
                alt={`${company.name} logo`}
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-xl font-black uppercase tracking-wide text-ink">
                {company.shortName}
              </span>
              <span className="hidden text-xs font-bold uppercase text-blueprint sm:block">
                AC, fridge & washing machine repair
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-ticket ${isActive(item.href) ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href={`tel:${company.phone}`} className="btn-quiet px-4 py-2">
              <Phone size={18} />
              {company.phone}
            </a>
            <Link href="/contact" className="btn-print px-4 py-2">
              Book
              <ArrowRight size={17} />
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center border-2 border-ink bg-royal text-white shadow-hard md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav className="poster-shadow mt-3 grid gap-2 border-2 border-ink bg-paper p-3 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-2 border-ink bg-white px-4 py-3 text-sm font-black uppercase tracking-wide shadow-hard-sm ${
                  isActive(item.href) ? "bg-gold text-ink" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${company.phone}`} className="btn-print mt-2 justify-center">
              <Phone size={18} />
              Call now
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-quiet justify-center">
              Book service
              <ArrowRight size={18} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
