"use client"
import { Suspense } from "react";
import SearchPopup from "./SearchPopup";
import Header from "./Header";
import Footer from "./Footer";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Wrapper({children}) {
  return (
    <>
    <Header />
    <SearchPopup />
    <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    <Footer />
    </>
  )
}
