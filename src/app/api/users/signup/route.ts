import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //check if user exists
        const user = await User.findOne({email: email})
        if(user){
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: 'User created',
            success: true,
            savedUser

        });

    }
    catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}