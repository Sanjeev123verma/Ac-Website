"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/authContext";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const { isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isAdmin && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [hasMounted, isAdmin, isLoginPage, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!hasMounted) return null;

  if (isLoginPage) {
    return children;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <button
        type="button"
        className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-md bg-slate-900 text-white shadow-md md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open admin menu"
      >
        <Menu size={22} />
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin menu overlay"
        />
      )}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen px-4 py-6 pt-20 md:ml-64 md:px-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}
