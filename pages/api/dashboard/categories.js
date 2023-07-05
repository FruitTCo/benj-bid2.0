import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const categories = await prisma.bidCategory.findMany();
  return res.status(200).json({ categories: categories });
}
