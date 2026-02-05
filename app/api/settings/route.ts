import connectDB from "@/lib/connectDB";
import Settings from "@/model/setting.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
    try {
        const {ownerId, buisnessTitle, supportEmail, knowledge} = await req.json();
        
        if(!ownerId) {
            return NextResponse.json({success : false, message : "Owner does not exist"}, {status : 400});
        }

        await connectDB();
        const settings = await Settings.findOneAndUpdate({ownerId}, {ownerId, buisnessTitle, supportEmail, knowledge}, {new : true, upsert : true});

        return NextResponse.json({success : true, message : "User created or updated", settings}, {status : 200})
    } catch (error) {
        return NextResponse.json({success : false, message : `Settings error: ${error}`}, {status : 500});
    }
}


