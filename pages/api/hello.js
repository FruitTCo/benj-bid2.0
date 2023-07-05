// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  function isDateLessThanCurrentTime(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    return givenDate < currentDate;
  }

  const items = await prisma.bidItem.findMany({
    where: {
      completed: false,
    },
  });

  for (const item of items) {
    if (isDateLessThanCurrentTime(item.endsAt)) {
      await prisma.user.update({
        where: {
          id: item.id,
        },
        data: {
          completed: true,
        },
      });
    }
  }

  res.status(200);
}
