import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { id } = req.body;

  const item = await prisma.bidItem.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
      Bidders: true,
      BidItemImage: true,
    },
  });

  res.status(200).json(item);
}
