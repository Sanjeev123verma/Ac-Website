"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/context/authContext";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/customers", label: "Customers" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/registration", label: "Registrations" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const getLinkClasses = (path) =>
    pathname === path
      ? "block rounded-md bg-slate-700 px-4 py-3 font-semibold text-sky-200"
      : "block rounded-md px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-white";

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-full w-64 bg-slate-900 text-white shadow-xl transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/ai-assets/swan-service-logo-small.jpg"
            alt="Swan AC logo"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <button
          type="button"
          className="rounded-md p-2 text-white hover:bg-white/10 md:hidden"
          onClick={onClose}
          aria-label="Close admin menu"
        >
          <FiX size={24} />
        </button>
      </div>

      <nav className="mt-4 px-3">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={getLinkClasses(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-md bg-red-500 px-4 py-3 text-left font-semibold text-white hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
