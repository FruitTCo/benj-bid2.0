"use client";
import { useState } from "react";
import AuctionItem from "@/components/AuctionItem";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Page(props) {
  const { items } = props;

  const [live_auction, setLive_Auction] = useState(items);

  const search = useSearchParams();
  const [searchParam, setSearchParam] = useState(search ? search.get("q") : "");

  const router = useRouter();

  const onSearch = () => {
    if (searchParam === "" || searchParam === null) {
      return;
    }

    const encodedSearchQuery = encodeURI(searchParam);
    return router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="live-auction-section pt-120 pb-120">
      <div className="mx-auto" style={{ width: "80%" }}>
        <small className="text-sm text-muted">
          Found {live_auction.length} items.
        </small>
        <div className="input-group mb-5 mt-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <span
            onClick={onSearch}
            className="input-group-text border-0"
            id="search-addon"
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4 mb-60 d-flex justify-content-center">
          {live_auction.map((item) => {
            return <AuctionItem key={item.id} item={item} />;
          })}
        </div>

        {/* pagination */}
        {/* <div className="row">
          <nav className="pagination-wrap">
            <ul className="pagination d-flex justify-content-center gap-md-3 gap-2">
              <li className="page-item">
                <a className="page-link" href="#" tabIndex="-1">
                  Prev
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  01
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="#">
                  02
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  03
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const items = await fetch("https://benj-bid2-0.vercel.app/api/auctions", {
    method: "GET",
  }).then((res) => res.json());

  return {
    props: {
      items: items.items,
    },
  };
}
