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
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function CustomerPageClient() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: fetchData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "contacts",
      activeTab,
      debouncedSearch,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/contact?search=${debouncedSearch}&page=${
          pagination.pageIndex + 1
        }&limit=${pagination.pageSize}&status=${activeTab}`,
        { method: "GET" }
      );
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Fetch error");

      return {
        contacts: json.data?.contacts || [],
        pagination: json.data?.pagination || {
          totalItems: 0,
          currentPage: 1,
          totalPages: 1,
        },
      };
    },
  });

  const refreshContacts = () => {
    queryClient.invalidateQueries({ queryKey: ["contacts"], exact: false });
    queryClient.invalidateQueries({
      queryKey: ["dashboard-contacts"],
      exact: false,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      refreshContacts();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Status update failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Status updated");
      refreshContacts();
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
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Service",
      accessorKey: "service",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isCompleted = status === "Completed";

        return (
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isCompleted}
              disabled={updateStatusMutation.isPending}
              onChange={() =>
                updateStatusMutation.mutate({
                  id: row.original._id,
                  status: isCompleted ? "Pending" : "Completed",
                })
              }
            />
            <div
              className={`peer relative h-7 w-14 rounded-full transition-colors duration-300 ${
                isCompleted ? "bg-green-400" : "bg-yellow-400"
              }`}
            >
              <div
                className={`absolute left-1 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  isCompleted ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {isCompleted ? "Completed" : "Pending"}
            </span>
          </label>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => format(new Date(getValue()), "d-MMM-yyyy"),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <RiDeleteBin6Fill
          className="cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => {
            if (confirm("Delete this contact?")) {
              deleteMutation.mutate(row.original._id);
            }
          }}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: fetchData?.contacts || [],
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
      <h1 className="flex justify-center text-3xl font-bold">
        Admin Customers
      </h1>
      <Breadcrumb />

      <div className="mb-2 flex space-x-8 rounded-md bg-gray-100 p-2">
        {["Pending", "Completed"].map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "font-semibold text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <hr className="mb-4 border-t border-gray-700" />

      <div className="flex items-center justify-end gap-2">
        <input
          type="text"
          placeholder="Search by name..."
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
}
