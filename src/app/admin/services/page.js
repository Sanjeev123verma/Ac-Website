"use client";

import Breadcrumb from "@/components/admin/Breadcrumb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";

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
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"], exact: false });
      setNewService("");
      setShowModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

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

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service deleted");
      queryClient.invalidateQueries({ queryKey: ["services"], exact: false });
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
            type="button"
            onClick={() => {
              setIsEditing(true);
              setSelectedId(row.original._id);
              setNewService(row.original.service);
              setShowModal(true);
            }}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <RiDeleteBin6Fill
            className="cursor-pointer text-red-500 hover:text-red-700"
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
    <div>
      <h1 className="flex justify-center text-3xl font-bold">Admin Services</h1>
      <Breadcrumb />

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setNewService("");
            setIsEditing(false);
            setSelectedId(null);
            setShowModal(true);
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Service
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close service modal"
            >
              x
            </button>
            <h2 className="mb-4 text-xl font-semibold">
              {isEditing ? "Edit Service" : "Add New Service"}
            </h2>
            <input
              type="text"
              placeholder="Enter service name"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={addMutation.isPending || updateMutation.isPending}
                className="rounded-md bg-green-500 px-4 py-2 text-white disabled:opacity-60"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="my-4 border-t border-gray-300" />

      <div className="flex items-center justify-end gap-2">
        <input
          type="text"
          placeholder="Search by service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60 rounded-md border border-gray-300 p-2"
        />
        <button
          type="button"
          onClick={refetch}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="text-red-500">{error.message}</div>
        ) : (
          <>
            <table className="min-w-full rounded-lg border">
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
                    <td colSpan={columns.length} className="p-4 text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="border-b px-4 py-2">
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

            <div className="mt-4 flex justify-between">
              <span>
                Page {fetchData?.pagination?.currentPage || 1} of{" "}
                {fetchData?.pagination?.totalPages || 1}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
