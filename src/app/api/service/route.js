import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { search = "", page = 1, limit = 10 } = Object.fromEntries(req.nextUrl.searchParams);

  const query = search
    ? { service: { $regex: search, $options: "i" } }
    : {};

  const totalItems = await Service.countDocuments(query);
  const services = await Service.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  return NextResponse.json({
    success: true,
    data: {
      services,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
      },
    },
  });
}

export async function POST(req) {
  await dbConnect();
  const { service } = await req.json();

  const created = await Service.create({ service });
  return NextResponse.json({ success: true, data: created });
}
