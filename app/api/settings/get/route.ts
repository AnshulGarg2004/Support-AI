import connectDB from "@/lib/connectDB";
import Settings from "@/model/setting.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { ownerId } = await req.json();
        console.log("Owner id: in api/s/g ", ownerId);
        
        if (!ownerId) {
            return NextResponse.json({ success: false, message: "Owner does not exist", ownerId }, { status: 400 });
        }

        await connectDB();
        console.log("mongo ok now fetching sett from db");
        
        const settings = await Settings.findOne({ ownerId });
        console.log(settings);
        
        return NextResponse.json({ success: true, message: "User created or updated", settings }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: `Settings error: ${error}` }, { status: 500 });
    }
}