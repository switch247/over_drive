
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { email } = await req.body;
        const existingUser = await db.user.findUnique({ where: { email } });
        console.log("user: ", existingUser);
        return NextResponse.json({ existingUser });
    } catch (error) {
        console.log(error);
    }
}