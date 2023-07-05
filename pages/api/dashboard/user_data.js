import prisma from "@/prisma/prisma";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  const { token } = req.body;

  const orderpending = await prisma.purchase.findMany({
    where: {
      userId: token,
      ordercompleted: false,
      orderpickedup: false,
      pending: true,
      complete: false,
    },
  });

  const orderprocessing = await prisma.purchase.findMany({
    where: {
      userId: token,
      ordercompleted: true,
      orderpickedup: false,
      pending: true,
      complete: false,
    },
  });

  const orderscompleted = await prisma.purchase.findMany({
    where: {
      userId: token,
      ordercompleted: true,
      orderpickedup: true,
      pending: true,
      complete: true,
    },
  });

  const orderpickedup = await prisma.purchase.findMany({
    where: {
      userId: token,
      ordercompleted: true,
      orderpickedup: true,
      pending: true,
      complete: false,
    },
  });

  const biddings = await prisma.bids.findMany({
    where: {
      userId: token,
      status: false,
    },
    include: {
      bid: {
        select: {
          BidItemImage: true,
          id: true,
          completed: true,
          endsAt: true,
          Bidders: true,
          startBidAmount: true,
        },
      },
    },
  });

  const listings = await prisma.BidItem.findMany({
    where: {
      userId: token,
      completed: false,
    },
    include: {
      category: true,
      BidItemImage: true,
    },
  });

  const sold = await prisma.BidItem.findMany({
    where: {
      userId: token,
      completed: true,
    },
    include: {
      category: true,
      BidItemImage: true,
    },
  });

  res.status(200).json({
    orders: {
      orderpending: orderpending,
      orderprocessing: orderprocessing,
      orderscompleted: orderscompleted,
      orderpickedup: orderpickedup,
    },
    biddings: biddings,
    listings: listings,
    sold: sold,
  });
}
