"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Image from "next/image";
import ReactWOW from "react-wow";
import Timer from "@/components/Timer";
import MaskedString from "@/components/MaskedString";
import { useSession } from "next-auth/react";

// Generates `/projects/1` and `/projects/2`
export async function getStaticPaths() {
  const items = await fetch("http://localhost:3000/api/auctions", {
    method: "GET",
  }).then((res) => res.json());

  const paths = items?.items?.map((ActiveData) => ({
    params: { id: ActiveData.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  // Retrieve the `id` parameter from the URL
  // console.log(context.params.id);
  const { id } = context.params;

  // Find the project with matching `id`
  const ActiveData = await fetch(
    "http://localhost:3000/api/auctions/item_data",
    {
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then((res) => res.json());

  const otherAunction = await fetch(
    "http://localhost:3000/api/auctions/other",
    {
      body: JSON.stringify({
        id: ActiveData.category.id,
        excludeId: ActiveData.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then((res) => res.json());

  return {
    // Passed to the page component as props
    props: { data: ActiveData, otherAunction: otherAunction },
  };
}

export default function Page(props) {
  const { data, otherAunction } = props;

  const { data: session, status, update } = useSession();
  const user = session?.user;

  const [aunc_biddings, setBiddings] = useState([]);

  useEffect(() => {
    if (data?.Bidders) {
      setBiddings(data?.Bidders);
    }
  }, []);

  function convertDateFormat(dateString) {
    if (dateString === undefined || dateString === null) {
      return "";
    }

    const timestamp = Date?.parse(dateString);
    const convertedDate = new Date(timestamp)?.toISOString();

    return convertedDate;
  }

  const [ActiveImage, setActiveImage] = useState(data.BidItemImage[0].image);
  const [placeBidsAmount, setPlaceBidsAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const Completionist = () => <span>Bid just ended!</span>;

  const placeBid = async () => {
    setLoading(true);
    if (placeBidsAmount === undefined || placeBidsAmount === null) {
      setLoading(false);
      return alert("bid amount should be greater than bid amount");
    }

    if (parseInt(data.minBidAmount) >= parseInt(placeBidsAmount)) {
      setLoading(false);
      return alert(
        "bid amount should be greater than the specified minimum bid amount"
      );
    }

    const res = await fetch("/api/auctions/placeBid", {
      method: "POST",
      body: JSON.stringify({
        bidId: data.id,
        amount: placeBidsAmount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setLoading(false);
      alert("An error occured, couldn't create auction new listing");
      return;
    }

    let responsedata = await res.json();
    let oldBiddings = await aunc_biddings;

    console.log(responsedata, oldBiddings);

    await setBiddings([responsedata, ...oldBiddings]);

    setLoading(false);

    console.log(aunc_biddings);

    return alert("Bid placed successfully");
  };

  return (
    <>
      <div className="auction-details-section pt-120">
        <Image
          alt="image"
          src="/assets/images/bg/section-bg.png"
          className="img-fluid section-bg-top"
        />
        <Image
          alt="image"
          src="/assets/images/bg/section-bg.png"
          className="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row g-4 mb-50">
            <div className="col-xl-6 col-lg-7 d-flex flex-row align-items-start justify-content-lg-start justify-content-center flex-md-nowrap flex-wrap gap-4">
              <ul
                className="nav small-image-list d-flex flex-md-column flex-row justify-content-center gap-4 wow fadeInDown"
                data-wow-duration="1.5s"
                data-wow-delay=".4s"
              >
                {data.BidItemImage.map((i) => {
                  return (
                    <li key={i.id} className="nav-item">
                      <div
                        data-bs-toggle="pill"
                        data-bs-target="#gallery-img1"
                        aria-controls="gallery-img1"
                        onClick={() => setActiveImage(i.image)}
                      >
                        <Image
                          alt="image"
                          src={i.image}
                          className="img-fluid"
                          style={{ minWidth: "120px" }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div
                className="tab-content mb-4 d-flex justify-content-lg-start justify-content-center wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".4s"
              >
                <div
                  className="tab-pane big-image fade show active"
                  id="gallery-img1"
                >
                  <Image alt="image" src={ActiveImage} className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div
                className="product-details-right wow fadeInDown"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <h3>{data.name}</h3>
                <p>
                  sellers note: <q className="para">{data.sellersNote}</q>
                </p>
                <p>
                  Category: {data.category?.name}, Condition:{" "}
                  {data?.itemCondition}
                </p>
                <h4>
                  Bidding Price:{" "}
                  <span>₦ {data.startBidAmount?.toLocaleString()}</span>
                </h4>
                <div className="flex-row">
                  <h4>Bidding Ends:</h4>
                  <Countdown
                    date={convertDateFormat(data.endsAt)}
                    className="h4"
                  />
                </div>
                <div className="bid-form">
                  <div className="form-title">
                    <h5>Bid Now</h5>
                    <p>
                      Bid Amount : Minimum Bid ₦{" "}
                      {data.minBidAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <div className="form-inner gap-2">
                      <input
                        type="text"
                        placeholder="₦00.00"
                        value={placeBidsAmount}
                        onChange={(e) => setPlaceBidsAmount(e.target.value)}
                      />
                      {loading ? (
                        <p>Bidding...</p>
                      ) : (
                        <button
                          className="eg-btn btn--primary btn--sm"
                          onClick={placeBid}
                        >
                          Place Bid
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center g-4">
            <div className="col-lg-8">
              <ul
                className="nav nav-pills d-flex flex-row justify-content-start gap-sm-4 gap-3 mb-45 wow fadeInDown"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active details-tab-btn"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link details-tab-btn"
                    id="pills-bid-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bid"
                    type="button"
                    role="tab"
                    aria-controls="pills-bid"
                    aria-selected="false"
                  >
                    Biding History
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link details-tab-btn"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Other Auction
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="describe-content">
                    <p className="para">{data.description}</p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-bid"
                  role="tabpanel"
                  aria-labelledby="pills-bid-tab"
                >
                  <div className="bid-list-area">
                    <ul className="bid-list">
                      {aunc_biddings ? (
                        aunc_biddings.map((bid) => {
                          return (
                            <li key={bid.id}>
                              <div className="row d-flex align-items-center">
                                <div className="col-7">
                                  <div className="bidder-area">
                                    <div className="bidder-content">
                                      <h6>₦ {bid.amount?.toLocaleString()}</h6>
                                      {user?.sub === bid.userId ? (
                                        <small
                                          style={{ fontSize: 12, opacity: 0.8 }}
                                        >
                                          My bid
                                        </small>
                                      ) : (
                                        <MaskedString
                                          originalString={bid.userId}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-5 text-end">
                                  <div className="bid-time">
                                    <Timer dbDate={bid.createdAt} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <p>No bids yet be the first!</p>
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div className="row gy-4 mb-60 d-flex justify-content-center">
                    {otherAunction
                      ? otherAunction.slice(0, 4).map((item) => {
                          return <AuctionItem item={item} />;
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar">
                <div
                  className="sidebar-banner wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay="1s"
                >
                  <div className="banner-content">
                    <span>CARS</span>
                    <h3>Toyota AIGID A Clasis Cars Sale</h3>
                    <Link
                      href="/auctions"
                      className="eg-btn btn--primary card--btn"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us-counter pb-120 pt-120">
        <div className="container">
          <div className="row g-4 d-flex justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
              <ReactWOW animation="fadeInDown" duration="1.5s" delay="0.2s">
                <div className="counter-single text-center d-flex flex-row hover-border1">
                  <div className="counter-icon">
                    <Image alt="image" src="/assets/images/icons/employee.svg" />
                  </div>
                  <div className="coundown d-flex flex-column">
                    <h3>5400&nbsp;</h3>
                    <p>Happy Customer</p>
                  </div>
                </div>
              </ReactWOW>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
              <ReactWOW animation="fadeInDown" duration="1.5s" delay="0.4s">
                <div className="counter-single text-center d-flex flex-row hover-border1">
                  <div className="counter-icon">
                    <Image alt="image" src="/assets/images/icons/review.svg" />
                  </div>
                  <div className="coundown d-flex flex-column">
                    <h3>1250&nbsp;</h3>
                    <p>Good Reviews</p>
                  </div>
                </div>
              </ReactWOW>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
              <ReactWOW animation="fadeInDown" duration="1.5s" delay="0.6s">
                <div className="counter-single text-center d-flex flex-row hover-border1">
                  <div className="counter-icon">
                    <Image alt="image" src="/assets/images/icons/smily.svg" />
                  </div>
                  <div className="coundown d-flex flex-column">
                    <h3>4250&nbsp;</h3>
                    <p>Winner Customer</p>
                  </div>
                </div>
              </ReactWOW>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
              <ReactWOW animation="fadeInDown" duration="1.5s" delay="0.8s">
                <div className="counter-single text-center d-flex flex-row hover-border1">
                  <div className="counter-icon">
                    <Image alt="image" src="/assets/images/icons/comment.svg" />
                  </div>
                  <div className="coundown d-flex flex-column">
                    <h3>500&nbsp;</h3>
                    <p>New Comments</p>
                  </div>
                </div>
              </ReactWOW>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
