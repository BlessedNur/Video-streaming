import connectDB from "@/Utility/db";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";
import React from "react";

export const GET = async ({ params }) => {
  const id = params.id;
  try {
    await connectDB();
    const post = await Movie.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("database error", { status: 500 });
  }
  // return <h1>{id}</h1>;
};

// export default page;
