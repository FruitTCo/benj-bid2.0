"use client";
import Link from "next/link";
import Image from "next/image";
import Countdown from "react-countdown";
import ReactWOW from "react-wow";

export default function AuctionItem({ item }) {

  function convertDateFormat(dateString) {
    
    if (dateString === undefined || dateString === null) {
      return ""
    }

    const timestamp = Date?.parse(dateString);
    const convertedDate = new Date(timestamp)?.toISOString();

    return convertedDate;
  }
  
  const Completionist = () => <span>Bid just ended!</span>;
  

  return (
    <div className="col-lg-4 col-md-6 col-sm-10">
      <ReactWOW animation="fadeInDown" duration="1.5s" delay="0.2s">
        <div className="eg-card auction-card1">
          <div className="auction-img">
            <Image width={414} height={230} alt="image" src={item.BidItemImage[0].image} />
            <div className="auction-timer">
              <div className="countdown" id="timer1">
                <Countdown date={convertDateFormat(item.endsAt)} className="h4"><Completionist/></Countdown>
              </div>
            </div>
          </div>
          <div className="auction-content">
            <h4>
              <Link href={`auctions/${item.id}`}>
                {item.name}
              </Link>
            </h4>
            <p>
              Bidding Price : {item.BidAmount}
            </p>
            <p>
              Condition : {item.itemCondition}
            </p>
            <div className="auction-card-bttm">
              <Link
                href={`/auctions/${item.id}`}
                className="eg-btn btn--primary btn--sm"
              >
                Place a Bid
              </Link>
            </div>
          </div>
        </div>
      </ReactWOW>
    </div>
  );
}
