import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { id, excludeId } = req.body;

  const items = await prisma.bidItem.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
      BidItemImage: true,
    },
  });

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  var filteredArray = [];

  if (excludeId) {
    filteredArray = items.filter((item) => item.id !== excludeId);
  } else {
    filteredArray = items;
  }

  const shuffledList = shuffle(filteredArray);

  res.status(200).json(shuffledList);
}
