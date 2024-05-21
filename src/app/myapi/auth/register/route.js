import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/Utility/db";

export const POST = async (req, res, next) => {
  //get all the data required from the server
  const { username, email, password } = await req.json();

  try {
    //console.log data
    console.log("Received Data:", { username, email, password });
    //conect to our database

    await connectDB();

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(email);
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 400,
        }
      );
    }
    //hash password
    const hashedPassword = bcrypt.hashSync(password, 5);
    //validate our user to the user model we built
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    //save the user and his information to the database
    await newUser.save();
    //return a response to the api after creating the new user
    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
