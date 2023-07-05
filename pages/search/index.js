"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import Spinner from "./Spinner";
import AuctionItem from "@/components/AuctionItem";

export default function Search() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const router = useRouter();

  const useSearch = useSearchParams();
  const searchQuery = useSearch ? search.get("q") : null;

  const encodedSearchQuery = encodeURI(searchQuery || "");

  React.useEffect(() => {
    setLoading(true);
    try {
      async function getPageDetails() {
        const responsedata = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({
            query: encodedSearchQuery,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        setData(responsedata?.bidItems);
      }

      getPageDetails();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [encodedSearchQuery]);

  if (loading) {
    return <Spinner />;
  }

  if (!data?.bidItems) {
    return router.back();
  }

  return (
    <div className="live-auction-section pt-120 pb-120">
      <div className="mx-auto mb-5" style={{ width: "80%" }}>
        <small className="text-sm text-muted"></small>
        <div className="container">
          <div className="flex-row d-flex justify-content-center align-items-center">
            <div className="banner1-content">
              <h4 className="text-center">
                Showing results for:{" "}
                <span style={{ fontWeight: 700 }}>{searchQuery}</span>
              </h4>
              <small className="text-sm text-muted">
                found {data?.lenght} items
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4 mb-60 d-flex justify-content-center">
          {data?.map((item) => {
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

// Found {live_auction.length} items.
/* {live_auction.map((item) => {
            return (
              <AuctionItem
                item={item}
              />
            );
          })} */
