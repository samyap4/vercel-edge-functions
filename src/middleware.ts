import { NextRequest, NextResponse } from 'next/server';
import { cors } from "./utils/cors";

export const config = {
    matcher: "/api/otp-codes",
};

export default async function middleware(req: NextRequest, res: NextResponse) {
    return cors(req, res);
}