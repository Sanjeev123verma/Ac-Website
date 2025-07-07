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



// "use client";
// import { useState } from 'react';
// import Link from 'next/link';
// import { FiMenu, FiX } from 'react-icons/fi';
// import { usePathname } from 'next/navigation';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();

//   const menuItems = [
//     { href: '/admin/dashboard', label: 'Dashboard' },
//     { href: '/admin/customers', label: 'Customers' },
//     { href: '/admin/services', label: 'Services' },
//     { href: '/admin/registration', label: 'Registrations' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile menu button */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md border border-gray-200"
//         >
//           <FiMenu size={24} />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         md:translate-x-0 md:static md:inset-0
//       `}>
//         <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="md:hidden p-1 rounded-md hover:bg-gray-100"
//           >
//             <FiX size={20} />
//           </button>
//         </div>
        
//         <nav className="mt-4">
//           {menuItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`
//                 block px-4 py-3 text-sm font-medium transition-colors
//                 ${pathname === item.href 
//                   ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
//                   : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
//                 }
//               `}
//               onClick={() => setSidebarOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
          
//           <div className="mt-8 px-4">
//             <button 
//               onClick={() => {
//                 // Add logout logic here
//                 console.log('Logout clicked');
//               }}
//               className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="md:pl-64">
//         <main className="min-h-screen">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }