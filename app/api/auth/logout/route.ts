import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const cookieStore = await cookies();
    console.log("All cookies: ", cookieStore);
    cookieStore.delete('accessToken');

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
    
}