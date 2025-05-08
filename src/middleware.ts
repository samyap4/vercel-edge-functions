import { NextRequest, NextResponse } from 'next/server';
import { cors } from "./utils/cors";

export const config = {
    matcher: ["/api/otp-codes", "/api/clear-all-sessions"],
};

export default async function middleware(req: NextRequest, res: NextResponse) {
    res = NextResponse.next();
    return cors(req, res);
}