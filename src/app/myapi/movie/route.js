import connectDB from "@/Utility/db";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export const GET = async () =>  {
    try {
        // connection to the database
        await connectDB();
        // find all the movies in the database
        const movies = await Movie.find().select('+cast +trailers +companyLogos +director');
        // return the movies as JSON
        return new NextResponse(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        // if there is an error, return a 500 status code
        console.log(error);
        return new NextResponse('Database Error', { status: 500 });
    }
}
