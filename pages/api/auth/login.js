import prisma from "@/prisma/prisma";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }
    const body = JSON.parse(JSON.stringify(req.body));
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      include: {
        address: true,
      }
    });
    if (!user) {
      return res.status(404).send({ message: "User does not exit!" });
    }
    const same_password = bcrypt.compare(body.password, user.password);
    console.log(body.password, user.password);
    if (!same_password) {
      return res.status(404).send({ message: "Password doesn't match!" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(405).send({ message: `{error.message}` });
  }
}
