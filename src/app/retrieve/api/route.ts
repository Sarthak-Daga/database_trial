import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Name } = body;

    // Validate the request body
    if (!Name) {
      console.error("Validation Error: Missing Name");
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    // Query the database to retrieve the RollNo for the given Name
    const { data, error } = await supabase
      .from("NameAndRollNo")
      .select("RollNo")
      .eq("Name", Name)
      .single(); // Retrieve only one record

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Failed to retrieve data from the database." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "No data found for the given name." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
