"use client";
import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const user = session?.user.user;

  const [scroll, setScroll] = useState(0);

  const search = useSearchParams();
  const [searchParam, setSearchParam] = useState(search ? search.get("q") : "");

  const router = useRouter();

  useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <div className="topbar">
        <div className="topbar-left d-flex flex-row align-items-center">
          <h6>Follow Us</h6>
          <ul className="topbar-social-list gap-2">
            <li>
              <Link href="https://www.facebook.com/">
                <i className="bx bxl-facebook"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.twitter.com/">
                <i className="bx bxl-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/">
                <i className="bx bxl-instagram"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.pinterest.com/">
                <i className="bx bxl-pinterest-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="email-area">
          <h6>
            Email: {""}
            <Link href="mailto:benji@benj_bid.com">
              <span className="__cf_email__">benji@benj_bid.com</span>
            </Link>
          </h6>
        </div>
        <div className="topbar-right">
          <ul className="topbar-right-list">
            <li>
              {status === "authenticated" ? (
                <span>
                  Welcome <b>{user?.firstname}</b>
                </span>
              ) : null}
            </li>
            <li>₦ Currency</li>
          </ul>
        </div>
      </div>

      <header className={`header-area style-1 ${scroll > 0 ? "sticky" : ""}`}>
        <div className="header-logo">
          <Link href="/">
            <Image alt="image" width={100} height={50} src="/next.svg" />
          </Link>
        </div>
        <div className="main-menu">
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap">
              <Link href="/">
                <Image alt="image" src="/assets/images/bg/header-logo.png" />
              </Link>
            </div>
            <div className="menu-close-btn">
              <i className="bi bi-x-lg"></i>
            </div>
          </div>
          <div className="d-lg-none d-block">
            <form className="mobile-menu-form mb-4">
              <div className="input-with-btn d-flex flex-column">
                <input
                  onChange={(e) => setSearchParam(e.target.value)}
                  type="text"
                  placeholder="Search here..."
                />
                <button
                  onClick={(e) => onSearch(e)}
                  type="submit"
                  className="eg-btn btn--primary btn--sm"
                >
                  Search
                </button>
              </div>
            </form>
            {status !== "loading" ? (
              <div className="input-with-btn d-flex flex-column mb-5">
                {status === "authenticated" ? (
                  <Link
                    href="/dashboard"
                    className="eg-btn btn--primary btn--sm"
                  >
                    dashboard
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="eg-btn btn--primary btn--sm"
                  >
                    login
                  </Link>
                )}
              </div>
            ) : null}
          </div>
          <ul className="menu-list">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/how-works">How It Works</Link>
            </li>
            <li>
              <Link href="/auctions">Browse Product</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right d-flex align-items-center">
          <div className="hotline d-xxl-flex d-none">
            <div className="hotline-icon">
              <Image alt="image" src="/assets/images/icons/header-phone.svg" />
            </div>
            <div className="hotline-info">
              <span>Click To Call</span>
              <h6>
                <Link href="tel:347-274-8816">+347-274-8816</Link>
              </h6>
            </div>
          </div>
          <div className="search-btn">
            <i className="bi bi-search"></i>
          </div>
          <div className="eg-btn btn--primary header-btn">
            {status === "authenticated" ? (
              <Link href="/dashboard">dashboard</Link>
            ) : (
              <Link href="/auth/login">login</Link>
            )}
          </div>
          <div className="mobile-menu-btn d-lg-none d-block">
            <i className="bx bx-menu"></i>
          </div>
        </div>
      </header>
    </>
  );
}
