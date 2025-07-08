"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // ✅ Add useState here

export default function AdminLayout({ children }) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false); // ✅ Now this works

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isAdmin) {
      router.push("/admin/login");
    }
  }, [hasMounted, isAdmin, router]);

  if (!hasMounted || !isAdmin) return null;

  return (
    <div className="flex admin-layout">
      <AdminSidebar />
      <div className="flex-1 py-6">{children}</div>
    </div>
  );
}
