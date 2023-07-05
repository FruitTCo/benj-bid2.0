import prisma from "@/prisma/prisma";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  try {
    const body = JSON.parse(JSON.stringify(await req.body));
    const { firstname, lastname, email, password } = body;

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "an error occurred",
    });
  }
}
