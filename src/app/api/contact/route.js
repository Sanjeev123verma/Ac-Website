// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import contact from '@/models/Contact'  // Ensure your model name is correctly capitalized

// export async function POST(request) {

//   try {
//     await dbConnect();  // Connect to the database
//    const body = await request.json();
//    console.log('Form data recieved:', body);

//     const { name, phone, address, service, message = null } = body;

//       // Validate required fields
//       if (!name || !phone || !address || !service) {
//         return NextResponse.json(
//           { message: 'Please fill in all required fields (name, phone, address, service).' },
//           { status: 400 }
//         );
//       }

//        // Name validation
//     const namePattern = /^[a-zA-Z\s]{3,20}$/;
//     if (!namePattern.test(name.trim())) {
//       return NextResponse.json(
//         { message: 'Invalid name. Name must be 3-20 characters long and can only contain alphabets and spaces.' },
//         { status: 400 }
//       );
//     }

//     // Optionally, add more validation like phone number format, service options, etc.
//     const phonePattern =/^[6-9][0-9]{9}$/; // Example of a 10-digit Indian phone number
//     if (!phonePattern.test(phone)) {
//       return NextResponse.json(
//         { message: 'Invalid phone number format.' }, { status: 400 });
//     }

//     // Save the contact form dataa
//     const newContact = new contact({
//       name: name.trim(),
//       phone,
//       address,
//       service,
//       message,
//     });

//     await newContact.save();  // Save data to MongoDB

//     return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
//   }
//   catch (error) {
//     console.error('Error saving contact form:', error);
//     return NextResponse.json({ message: 'Failed to submit form', error: error.message }, { status: 500 });
//   }
// }

// // PUT: Update user status (active/inactive)
// export async function PUT(req) {
//   await dbConnect();
//   try {
//     const { id, status } = await req.json(); // Get the id and status from the request body

//     if (!id || !status) {
//       return NextResponse.json(
//         { message: 'ID and status are required' },
//         { status: 400 }
//       );
//     }
//     // Ensure the status is either 'active' or 'inactive'
//     if (!['pending', 'success'].includes(status)) {
//       return NextResponse.json(
//         { message: 'Invalid status value' },
//         { status: 400 }
//       );
//     }

//     const updateData = { status };
//     if (status === 'success') {
//       updateData.completedAt = new Date(); // Set createdAt for completed services
//       console.log('CompletedAt timestamp set:', updateData.completedAt);
//     }

//    const updatedUser = await contact.findByIdAndUpdate(id, updateData, {
//       new: true, // Return the updated document
//     });

//     if (!updatedUser) {
//       return NextResponse.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'User status updated', user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating user:', error.message);
//     return NextResponse.json(
//       { message: 'Failed to update user', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete user by ID
// export async function DELETE(req) {
//   await dbConnect();
//   try {
//     const url = new URL(req.url);
//     const userId = url.searchParams.get('id'); // Extract 'id' from query params

//     if (!userId) {
//       return NextResponse.json(
//         { message: 'User ID is required' },
//         { status: 400 }
//       );
//     }

//     const deletedUser = await contact.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       return NextResponse.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'User deleted successfully', userId },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Failed to delete user', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // // Handle GET request (fetch data)
// // export async function GET() {
// //   try {
// //     await dbConnect(); // Connect to the database

// //     // Retrieve all contacts from the database
// //     const contacts = await contact.find(); // Fetch all documents in the collection

// //     return NextResponse.json({ contacts }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error fetching contacts:', error);
// //     return NextResponse.json(
// //       { message: 'Failed to fetch contacts', error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// // Handle GET request (fetch data)
// export async function GET(req) {
//   try {
//     await dbConnect(); // Connect to the database

//     const { searchParams } = new URL(req.url);

//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const limit = parseInt(searchParams.get('limit') || '10', 10);
//     const sortField = searchParams.get('sort') || 'createdAt';
//     const sortOrder = searchParams.get('order') || 'desc';
//     const search = searchParams.get('search') || '';

//     let filter = {};
//     if (search) {
//       const searchRegex = new RegExp(search, 'i'); // case-insensitive
//       filter = {
//         $or: [
//           { name: searchRegex },
//           { phone: searchRegex },
//         ],
//       };
//     }

//     const total = await contact.countDocuments(filter);

//     const skip = (page - 1) * limit;
//     const sortObj = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

//     // 5) Fetch data
//     const contacts = await contact.find(filter)
//       .skip(skip)
//       .limit(limit)
//       .sort(sortObj);

//     // Retrieve all contacts from the database
//   return NextResponse.json({ contacts, total }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     return NextResponse.json(
//       { message: 'Failed to fetch contacts', error: error.message },
//       { status: 500 }
//     );
//   }
// }



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