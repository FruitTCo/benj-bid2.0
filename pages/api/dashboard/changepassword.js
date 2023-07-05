import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/prisma";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  const password = req.body.password;
  
  const hashed_password = await bcrypt.hash(password, 10);

  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const updateUser = await prisma.user.update({
      where: {
        id: session.user.sub,
      },
      data: {
        password: hashed_password,
      },
    });

    if (!updateUser) {
      return res
        .status(500)
        .json({
          status: true,
          message: "An error occured, password update unsuccessfully",
        });
    }

    return res
      .status(200)
      .json({ status: true, message: "password updated successfully" });
  } else {
    // Not Signed in
    return res
      .status(401)
      .json({ status: false, message: "Not Signed in or Session expired" });
  }
}
