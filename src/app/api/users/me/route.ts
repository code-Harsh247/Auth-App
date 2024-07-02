import { getTokenData } from "@/helpers/getTokenData";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/app/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try{
        const userID = getTokenData(request);
        const user = await User.findOne({_id: userID}).select('-password');
        return NextResponse.json({
            message: 'User data fetched successfully',
            success: true,
            data: user
        });
    }
    catch(err: any){
        console.error(err)
    }
}
