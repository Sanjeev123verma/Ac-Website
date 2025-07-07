"use client";
import AdminLayout from "@/app/admin/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/admin/Breadcrumb";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use React Query for better data fetching
  const {
    data: contactData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-contacts"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/contact?page=1&limit=1");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dashboard fetched data:", data);

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch contacts");
        }

        return data.data;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const totalContacts = contactData?.pagination?.totalItems || 0;

  return (
    <AdminLayout>
      <div className="relative min-h-screen flex">
        {/* Menu Icon for Mobile */}
        <button
          className="fixed top-4 left-4 z-50 text-gray-800 md:hidden bg-gray-200 rounded-full p-2 shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar Component */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-800 text-white w-64 h-full p-4 transition-transform transform md:translate-x-0">
            <button
              className="absolute top-4 right-4 text-gray-200 text-3xl"
              onClick={() => setSidebarOpen(false)}
            >
              &times;
            </button>
            <nav className="mt-16">
              <Link href="/admin/dashboard">
                <div className="block py-2 px-4 text-xl font-semibold hover:bg-gray-700 rounded-md">
                  Dashboard
                </div>
              </Link>
              <Link href="/admin/customers">
                <div className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                  Customers
                </div>
              </Link>
              <Link href="/admin/services">
                <div className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                  Services
                </div>
              </Link>
              <Link href="/admin/registration">
                <div className="block py-2 px-4 hover:bg-gray-700 rounded-md">
                  Registrations
                </div>
              </Link>
              <button className="block py-2 px-4 mt-4 bg-red-400 rounded-md text-center hover:bg-red-500 w-full">
                Logout
              </button>
            </nav>
          </div>
        )}

        {/* Main Dashboard Content */}
        <div className={`flex-1 p-6 ml-0 md:ml-64`}>
          <h1 className="text-3xl font-bold text-center mb-8">
            Admin Dashboard
          </h1>
          {/* <Breadcrumb /> */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
              <p className="font-medium">Error loading dashboard data:</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col flex-wrap gap-4 mt-10 justify-center items-center sm:flex-row">
            <Link href="/admin/customers">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">
                  {isLoading ? "..." : totalContacts}
                </h2>
                <p className="text-lg">Total Customers</p>
              </div>
            </Link>

            <Link href="/admin/services">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-blue-400 to-teal-400 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">70</h2>
                <p className="text-lg">Total Services</p>
              </div>
            </Link>

            <Link href="/admin/registration">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">8</h2>
                <p className="text-lg">Total Registrations</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
