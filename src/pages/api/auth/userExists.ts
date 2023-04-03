import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.body;
        const existingUser = await db.user.findUnique({ where: { email } });
        console.log("user: ", existingUser);
        res.status(200).json({ existingUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
