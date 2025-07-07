"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-red-500 my-6">
      <span className="text-gray-600">Home</span>
      {segments.map((seg, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={href}>
            {" / "}
            <Link href={href} className="text-gray-600 hover:underline">
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
