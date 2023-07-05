import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { line1, line2, city, state, country, postalcode } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const upsertAddress = await prisma.address.upsert({
      where: {
        userId: session.user.sub,
      },
      update: {
        line1: line1,
        line2: line2,
        city: city,
        country: country,
        state: state,
        zipCode: postalcode,
      },
      create: {
        userId: session.user.sub,
        line1: line1,
        line2: line2,
        city: city,
        country: country,
        state: state,
        zipCode: postalcode,
      },
    });


    if (!upsertAddress) {
      return res.status(500).json({
        status: true,
        message: "An error occured, address update unsuccessfully",
      });
    }

    // update({ address: res.body });
    // update()

    return res
      .status(200)
      .json({ status: true, message: "Address updated successfully" });
  } else {
    // Not Signed in
    return res
      .status(401)
      .json({ status: false, message: "Not Signed in or Session expired" });
  }
}
