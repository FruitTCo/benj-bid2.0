import prisma from "@/prisma/prisma";


export default async function handler(req, res) {
  const items = await prisma.bidItem.findMany({
    include: {
      BidItemImage: true,
    },
  });

  res.status(200).json({ items: items });
}
