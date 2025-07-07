"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import Breadcrumb from "@/components/admin/Breadcrumb";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const ServicePage = () => {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [newService, setNewService] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // 🚀 Add Service Mutation
  const addMutation = useMutation({
    mutationFn: async (serviceName) => {
      const res = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: serviceName }),
      });
      if (!res.ok) throw new Error("Failed to add service");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["services"], exact: false });
      setNewService("");
      setShowModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = () => {
    if (!newService.trim()) {
      toast.error("Please enter a service name.");
      return;
    }
    if (isEditing) {
      updateMutation.mutate({ id: selectedId, service: newService });
    } else {
      addMutation.mutate(newService);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async ({ id, service }) => {
      const res = await fetch(`/api/service/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service }),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service updated");
      queryClient.invalidateQueries({ queryKey: ["services"], exact: false });
      setIsEditing(false);
      setSelectedId(null);
      setNewService("");
      setShowModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

  // 🔄 Fetch Services Query
  const {
    data: fetchData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "services",
      debouncedSearch,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/service?search=${debouncedSearch}&page=${
          pagination.pageIndex + 1
        }&limit=${pagination.pageSize}`
      );
      const json = await res.json();
      if (!json.success)
        throw new Error(json.message || "Failed to fetch services");
      return {
        services: json.data?.services || [],
        pagination: json.data?.pagination || {
          totalItems: 0,
          currentPage: 1,
          totalPages: 1,
        },
      };
    },
  });

  // ❌ Delete Service Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const columns = [
    {
      header: "Sr. No",
      cell: ({ row }) =>
        pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Service",
      accessorKey: "service",
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => format(new Date(getValue()), "d-MMM-yyyy"),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsEditing(true);
              setSelectedId(row.original._id);
              setNewService(row.original.service); // pre-fill input
              setShowModal(true);
            }}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            ✏️
          </button>

          <RiDeleteBin6Fill
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => {
              if (confirm("Delete this service?")) {
                deleteMutation.mutate(row.original._id);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: fetchData?.services || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: fetchData?.pagination?.totalPages || 0,
  });

  return (
    <AdminLayout>
      <div className="px-4 ml-64">
        <h1 className="flex text-3xl font-bold justify-center">Admin Services</h1>
        <Breadcrumb />

        {/* ➕ Add Service Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setNewService(""); // clear input
              setIsEditing(false); // reset edit mode
              setSelectedId(null); // reset selected service
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>

        {/* 🪟 Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Service" : "Add New Service"}
              </h2>
              <input
                type="text"
                placeholder="Enter service name"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

        <hr className="border-t border-gray-300 my-4" />

        {/* 🔍 Search */}
        <div className="flex justify-end gap-2 items-center">
          <input
            type="text"
            placeholder="Search by service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-60"
          />
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Refresh
          </button>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="text-red-500">{error.message}</div>
          ) : (
            <>
              <table className="min-w-full border rounded-lg">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-b px-4 py-2 text-left"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center p-4">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-2 border-b">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between mt-4">
                <span>
                  Page {fetchData?.pagination?.currentPage || 1} of{" "}
                  {fetchData?.pagination?.totalPages || 1}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicePage;
