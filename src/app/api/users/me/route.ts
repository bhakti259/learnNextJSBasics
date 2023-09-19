import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId =  await getDataFromToken(request);
        const user = await User
        .findOne({ _id: userId})
        .select("-password")   // select("-password")-> this means return all user infor from db except passowrd
        return NextResponse.json({
            message:"user found ",
            data: user
        })
         
    } catch (error: any) {
        console.log('error occued in fetching data', error.message)
        return NextResponse.json({message: error.message, status: 500})
    }
}