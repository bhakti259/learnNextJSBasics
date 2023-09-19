import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { json } from 'stream/consumers';
import jwt from 'jsonwebtoken';

connect();

export async function POST( request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "user do not exists" }, { status: 400 })
        }

        const validPassword =  await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'password does not match' }, { status: 400 })
        }

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETE!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: 'login succesfful',
            success: true
        })

        response.cookies.set("token", token, { 
            httpOnly: true, 
        })

        return response;
 
        
    } catch (error: any) {
        console.log('error occued im login', error.message)
        return NextResponse.json({message: error.message, status: 500})
    }
     
}
