// src/pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/auth";
import { db } from "@/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log("User already exists!");
    return res.status(422).json({ message: "User already exists!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User created!", user: newUser });
}