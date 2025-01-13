import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body:", body); // Log request body
    const { Name} = body;

    if (!Name) {
      console.error("Validation Error: Missing Name or RollNo");
      return NextResponse.json({ error: "Name and RollNo are required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("NameAndRollNo")
      .delete()
      .eq("Name" , Name)

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Data Inserted:", data);
    return NextResponse.json({ message: "Data inserted successfully", data });
  } catch (error) {
    console.error("Unhandled Error:", error); // Log any unhandled error
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
