import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchPopup() {
  const search = useSearchParams();
  const [searchParam, setSearchParam] = useState(search ? search.get("q") : "");

  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();

    if (searchParam === "" || searchParam === null) {
      const element = document.getElementById("mobile-s");
      element.classList.remove("slide");
      return;
    }

    const encodedSearchQuery = encodeURI(searchParam);
    return router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div id="mobile-s" className="mobile-search">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-11">
            <label>What are you lookking for?</label>
            <input onChange={(e)=>setSearchParam(e.target.value)} type="text" placeholder="Search Products, Category, Brand" />
          </div>
          <button
            onClick={(e) => onSearch(e)}
            className="col-1 d-flex justify-content-center align-items-center"
            style={{ background: "none", border: "none" }}
          >
            <div className="search-cross-btn">
              {searchParam ? (
                <i className="bi bi-search"></i>
              ) : (
                <i class="bi bi-x"></i>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
