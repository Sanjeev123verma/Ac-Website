"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const {
    data: contactData,
    isLoading: isContactLoading,
    error: contactError,
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const {
    data: serviceData,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useQuery({
    queryKey: ["dashboard-services"],
    queryFn: async () => {
      const response = await fetch("/api/service?page=1&limit=1");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch services");
      }

      return data.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const totalContacts = contactData?.pagination?.totalItems || 0;
  const totalServices = serviceData?.pagination?.totalItems || 0;
  const error = contactError || serviceError;

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-bold">Admin Dashboard</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          <p className="font-medium">Error loading dashboard data:</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
        <Link href="/admin/customers">
          <div className="flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transition-transform hover:scale-105 sm:w-64">
            <h2 className="text-4xl font-bold">
              {isContactLoading ? "..." : totalContacts}
            </h2>
            <p className="text-lg">Total Customers</p>
          </div>
        </Link>

        <Link href="/admin/services">
          <div className="flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-teal-400 text-white shadow-md transition-transform hover:scale-105 sm:w-64">
            <h2 className="text-4xl font-bold">
              {isServiceLoading ? "..." : totalServices}
            </h2>
            <p className="text-lg">Total Services</p>
          </div>
        </Link>

        <Link href="/admin/registration">
          <div className="flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md transition-transform hover:scale-105 sm:w-64">
            <h2 className="text-4xl font-bold">8</h2>
            <p className="text-lg">Total Registrations</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
