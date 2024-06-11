// pages/api/optimize-image.js

import sharp from "sharp";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl");
  const width = parseInt(searchParams.get("width")) || 800;

  try {
    // Fetch the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Optimize the image
    const optimizedImage = await sharp(imageBuffer)
      .resize({ width })
      .toFormat("webp")
      .toBuffer();

    // Set headers and return the optimized image
    const headers = new Headers();
    headers.append("Content-Type", "image/webp");
    return new NextResponse(optimizedImage, { status: 200, headers });
  } catch (error) {
    console.error("Error optimizing image:", error);
    return new NextResponse("Error optimizing image", { status: 500 });
  }
};
