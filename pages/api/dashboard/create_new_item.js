import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/prisma";
const cloudinary = require("@/utils/cloudinary");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const {
    name,
    category,
    description,
    endsAt,
    bidItemImage,
    itemCondition,
    startBidAmount,
    minBidAmount,
    sellersNote
  } = req.body;

  console.log(itemCondition,
    startBidAmount,
    minBidAmount,);

  const uploader = async (path) => await cloudinary.uploads(path, "benj-bid");

  const urls = [];

  for (const image of bidItemImage) {
    const newPath = await uploader(image);
    urls.push(newPath);
  }

  const mappedArray = urls.map((url) => {
    return { image: url.url };
  });

  if (session) {
    const result = await prisma.bidItem.create({
      data: {
        userId: session.user.sub,
        name: name,
        categoryId: category,
        description: description,
        endsAt: endsAt,
        minBidAmount: parseInt(minBidAmount),
        startBidAmount: parseInt(startBidAmount),
        itemCondition: itemCondition,
        sellersNote: sellersNote,
        BidItemImage: {
          create: mappedArray,
        },
      },
      include: {
        BidItemImage: true, // Include all posts in the returned object
      },
    });

    if (!result) {
      return res.status(500).json({
        status: false,
        message: "An error occured, couldn't create auction new listing",
      });
    }

    return res
      .status(200)
      .json({
        status: true,
        message: "Auction listing created",
        result: result,
      });
  } else {
    // Not Signed in
    return res
      .status(401)
      .json({ status: false, message: "Not Signed in or Session expired" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Set desired value here
    },
    responseLimit: false,
  },
};
