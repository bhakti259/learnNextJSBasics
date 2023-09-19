import { Red_Rose } from "next/font/google";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await NextResponse.json({
            message: "logout success",
            success: true
        })

        response.cookies.set ("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
        
    } catch (error) {
        return NextResponse.json({ error: "error logging out" }, { status: 500 })
    }

}