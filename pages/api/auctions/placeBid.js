import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { userId, bidId, amount } = req.body;

  const bid = await prisma.bids.create({
    data: {
      userId: session.user.sub,
      bidId: bidId,
      amount: parseInt(amount),
      status: false,
    },
  });

  res.status(200).json(bid);
}
