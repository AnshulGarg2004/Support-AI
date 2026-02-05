import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
    const session = await cookies();
    const token = session.get('accessToken')?.value;
    console.log("Token : ", token);
    try {
        const result : any = await scalekit.validateToken(token!);
        const user = await scalekit.user.getUser(result.sub);
        return user;
        console.log("Result: " , result);
        return null;
    } catch (error) {
        console.log("Error occured: ", error);
        
    }
}