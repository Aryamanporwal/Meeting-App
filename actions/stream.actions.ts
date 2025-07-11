"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async() =>{
    const user = await currentUser();
    if (!user) {
        throw new Error("User not found");
    }
    if(!apiKey || !apiSecret) {
        throw new Error("Stream API key or secret is not defined");
    }

    const client = new StreamClient(apiKey, apiSecret)
    const exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour expiration
    const issued = Math.floor(Date.now() / 1000)-60;

    const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: exp , issued_at: issued });
    return token;

}