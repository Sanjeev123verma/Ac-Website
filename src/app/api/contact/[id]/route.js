import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Reuse your model
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

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Contact ID is required" },
        { status: 400 }
      );
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact status updated", contact: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/contact/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update contact status", error: error.message },
      { status: 500 }
    );
  }
}
