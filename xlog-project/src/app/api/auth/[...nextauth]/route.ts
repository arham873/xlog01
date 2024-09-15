import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("NextAuth GET request received");
  return handler(req, res);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("NextAuth POST request received");
  console.log("Request body:", req.body);
  try {
    const result = await handler(req, res);
    console.log("NextAuth response:", result);
    return result;
  } catch (error) {
    console.error("NextAuth error:", error);
    return new Response(JSON.stringify({ error: "Authentication failed" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}