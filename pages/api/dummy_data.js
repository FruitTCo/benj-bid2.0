// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const tommorow = new Date();
  res.status(200).json({
    data: [
      {
        bid_end: tommorow,
        banner_image: "assets/images/bg/live-auc1.png",
        title: "Brand New royal Enfield 250 CC For Sale",
        bidding_price: "2630000",
      },
      {
        bid_end: tommorow,
        banner_image: "assets/images/bg/live-auc2.png",
        title: "Wedding Special Exclusive Cupple Ring (S2022)",
        bidding_price: "952300",
      },
      {
        bid_end: tommorow,
        banner_image: "assets/images/bg/live-auc1.png",
        title: "Brand New Honda CBR 600 RR For Special Sale (2022)",
        bidding_price: "1500000",
      },
      {
        bid_end: tommorow,
        banner_image: "assets/images/bg/live-auc1.png",
        title: "Toyota AIGID A Class Hatchback Sale (2017 - 2021)",
        bidding_price: "750000",
      },
      {
        bid_end: tommorow,
        banner_image: "assets/images/bg/live-auc1.png",
        title: "Toyota AIGID A Class Hatchback Sale (2017 - 2021)",
        bidding_price: "1950000",
      },
    ],
  });
}
