import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest) => {
    const redirectURl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    console.log("RedirectUrl: ", redirectURl);
    
    const url = scalekit.getAuthorizationUrl(redirectURl);
    console.log("Url: ", url);

    return NextResponse.redirect(url);
};