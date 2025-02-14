import connectDB from "@/Utility/db";
import Cartoon from "@/models/Cartoon";
import { NextResponse } from "next/server"


export const GET = async () =>  {
    try {
        // connection to the database
        await connectDB();
        // find all the posts in the database
        const cartoon = await Cartoon.find()
        // return the posts as a json
        return new NextResponse(JSON.stringify(cartoon),{status:200});
    } catch (error) {
        // if there is an error, return a 500 status code
        console.log(error)
        return new NextResponse('Database Error',{status:500});
    }
}