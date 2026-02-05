import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest) => {
    const {searchParams} = new URL(req.url);
    const code = searchParams.get("code");

    if(!code ) {
        return NextResponse.json({message : "Code not found", success : false}, {status : 500})
    }

    const redirectURi = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    const session = await scalekit.authenticateWithCode(code, redirectURi);
    console.log("Session : ",session);
    
    
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    response.cookies.set("accessToken", session.accessToken, {
        httpOnly : true,
        maxAge : 24 * 60 * 60 * 1000,
        secure : true,
        path : '/'
    });

    return response;
}