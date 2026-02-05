import connectDB from "@/lib/connectDB";
import Settings from "@/model/setting.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {

    try {

        const {ownerId, message } = await req.json();
        if (!ownerId || !message) {
            return NextResponse.json({ success: false, message: "Id or message is required" }, { status: 400 });
        }

        await connectDB();
        const setting = await Settings.findOne({ ownerId });

        if (!setting) {
            return NextResponse.json({ success: false, message: "Cannot find model" }, { status: 404 });
        }
        console.log('Seting data of chat: ', setting);


        const KNOWLEDGE = `
        Business Name - ${setting.buisnessTitle || "Not Provided"}
        Support Email - ${setting.supportEmail || "Not Provided"}
        Knowledge - ${setting.knowledge || "Not Provided"}
        `

        const prompt = `You are a professional customer support assistant for this business.
        
        Use ONLY the information provided below to answer the customer's question. You may rephrase, summarize, or interpret the information if needed. 
        Do NOT invent new policies, priices, or promise.
        
        If customer's question is completely unrelated to the information or cannot be reasonably answered from it, reply exactly with 'Please contact support.'
        
        ----------------------------------
        BUSINESS INFORMATION:
        ----------------------------------
        ${KNOWLEDGE}
        
        ----------------------------------
        CUSTOMER QUESTION:
        ----------------------------------
        ${message}
        
        ----------------------------------
        ANSWER:
        ----------------------------------
        
        `;


        const apiKeyGemini = process.env.GEMINI_API_KEY!;
        const ai = new GoogleGenAI({ apiKey: apiKeyGemini });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log("Response from ai: ", response);

        const res =  NextResponse.json({ success: true, message: "response fetched successfuly", response }, { status: 200 });
        res.headers.set('Allow-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return res;


    } catch (error) {
        const res =  NextResponse.json({ success: false, message: "Error in fetcing response from AI" }, { status: 500 });

        res.headers.set('Allow-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return res;
    }

}
export const OPTIONS = async () => {
    return NextResponse.json(null, {status : 201, headers : {
        "Allow-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }})
}
