import connectDB from "@/Utility/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server"


export const GET = async () =>  {
    try {
        // connection to the database
        await connectDB();
        // find all the posts in the database
        const posts = await Post.find()
        // return the posts as a json
        return new NextResponse(JSON.stringify(posts),{status:200});
    } catch (error) {
        // if there is an error, return a 500 status code
        console.log(error)
        return new NextResponse('Database Error',{status:500});
    }
}