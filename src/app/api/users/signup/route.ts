import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { json } from 'stream/consumers';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log('reqBody', reqBody)

        //check if user already existing

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }

        //hash pwd

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash( password, salt );

        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log('saved user', savedUser)

        return NextResponse.json( {
            message: 'user created succesfully',
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}