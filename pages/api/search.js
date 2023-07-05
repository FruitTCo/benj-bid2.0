import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  try {
    const { query } = req.body;

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    /**
     * Search posts
     */
    const bidItems = await prisma.bidItem.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        BidItemImage: true,
      },
    });

    /**
     * Save search
     */
    //   await prisma.searchQuery.create({
    //     data: {
    //       query,
    //     },
    //   });

    res.status(200).json({ bidItems });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
