import connectDB from "@/Utility/db";
import Anime from "@/models/Anime";
import Cartoon from "@/models/Cartoon";
import Movie from "@/models/Movie";
import Series from "@/models/Series";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectDB();
    let post = await Movie.findById(id);
    if (!post) {
      post = await Cartoon.findById(id);
    }
    if (!post) {
      post = await Series.findById(id);
    }
    if (!post) {
      post = await Anime.findById(id);
    }
    if (post) {
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } else {
      return new NextResponse("Post not found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
