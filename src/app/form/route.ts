import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req:Request) {
  try{
    const body = await req.json();
    const {Name , RollNo} = body ;

    const{data , error} = await supabase
      .from("NameAndRollNo")
      .insert([
        Name:
        RollNo:
      ])
  }
}

