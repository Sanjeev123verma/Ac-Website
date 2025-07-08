'use server';
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Define schema
const contactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    service: String,
    message: String,
    status: String,
    deleted: Boolean,
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// POST API
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("📦 Received form data:", body);

    const newContact = new Contact({
      ...body,
      status: "Pending",
      deleted: false,
    });
    await newContact.save();

    return NextResponse.json(
      { message: "Contact saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in /api/contact:", error);
    return NextResponse.json(
      { message: "Failed to submit form", error: error.message },
      { status: 500 }
    );
  }
}

// GET API
export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);

    // Pagination
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortField = url.searchParams.get("sort") || "createdAt";
    const sortOrder = url.searchParams.get("order") === "desc" ? -1 : 1;

    // Filters
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status");

    // Build query
    const query = {
      deleted: false,
      ...(search && { name: { $regex: search, $options: "i" } }),
      ...(status && { status }),
    };

    // Get total count first
    const total = await Contact.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Fetch data
    const contacts = await Contact.find(query)
      .select(
        "_id name phone address service message status createdAt updatedAt"
      )
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    // Properly serialize all data
    const sanitizedContacts = contacts.map((contact) => ({
      _id: contact._id.toString(),
      name: contact.name || "",
      phone: contact.phone || "",
      address: contact.address || "",
      service: contact.service || "",
      message: contact.message || "",
      status: contact.status || "Pending",
      createdAt: contact.createdAt ? contact.createdAt.toISOString() : null,
      updatedAt: contact.updatedAt ? contact.updatedAt.toISOString() : null,
    }));

    const response = {
      success: true,
      data: {
        contacts: sanitizedContacts,
        pagination: {
          totalItems: total,
          currentPage: page,
          itemsPerPage: limit,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE API
export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    await Contact.findByIdAndUpdate(id, { deleted: true });

    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/contact error:", error);
    return NextResponse.json(
      { message: "Failed to delete contact", error: error.message },
      { status: 500 }
    );
  }
}