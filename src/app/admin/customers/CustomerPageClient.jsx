"use client";
import AdminLayout from "@/app/admin/AdminLayout";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import Breadcrumb from "@/components/admin/Breadcrumb";

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

  // 🔁 Fetch filtered data
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

  // 🧹 Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries(["contacts"]);
    },
    onError: (err) => toast.error(err.message),
  });

  // 🔁 Status Toggle Mutation
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
  onMutate: async ({ id, status }) => {
    await queryClient.cancelQueries({ queryKey: ["contacts"] });

    const previousData = queryClient.getQueryData(["contacts"]);

    // Optimistically update
    queryClient.setQueryData(["contacts"], (old) => {
      if (!old) return old;
      const updatedContacts = old.contacts.map((contact) =>
        contact._id === id ? { ...contact, status } : contact
      );
      return { ...old, contacts: updatedContacts };
    });

    return { previousData };
  },
  onError: (err, variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData(["contacts"], context.previousData);
    }
    toast.error(err.message);
  },
  onSuccess: () => {
    toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["contacts", "Pending"] });
  queryClient.invalidateQueries({ queryKey: ["contacts", "Completed"] });
  },
});


  // 🧾 Table Columns
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
          <label className="inline-flex items-center cursor-pointer">
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
              className={`w-14 h-7 rounded-full peer ${
                isCompleted ? "bg-green-400" : "bg-yellow-400"
              } relative transition-colors duration-300`}
            >
              <div
                className={`absolute top-0.5 left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  isCompleted ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
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
          className="text-red-500 cursor-pointer hover:text-red-700"
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
    <AdminLayout>
      <div className="px-4 ml-64">
        <h1 className="flex justify-center text-3xl font-bold">Admin Customers</h1>
        <Breadcrumb />
        {/* Tabs */}
        <div className="flex space-x-8 bg-gray-100 p-2 rounded-md mb-2">
          {["Pending", "Completed"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <hr className="border-t border-gray-700 mb-4" />

        {/* Search & Refresh */}
        <div className="flex justify-end gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name..."
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

        {/* Table */}
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
}
