import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await dbConnect();
  const { service } = await req.json();
  const updated = await Service.findByIdAndUpdate(
    params.id,
    { service },
    { new: true }
  );
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(_, { params }) {
  await dbConnect();
  await Service.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
