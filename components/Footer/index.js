"use client"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  const sendMail = function(e) {
    e.preventDefault();
  }

  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <Link href="/"
                  ><Image alt="image" src="/next.svg"
                /></Link>
                <p>
                  Lorem ipsum dolor sit amet consecte tur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <form onSubmit={(e) => sendMail(e)}>
                  <div
                    className="input-with-btn d-flex jusify-content-start align-items-strech"
                  >
                    <input type="text" placeholder="Enter your email" />
                    <button type="submit">
                      <Image
                        alt="image"
                        src="/assets/images/icons/send-icon.svg"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
              <div className="footer-item">
                <h5>Useful Links</h5>
                <ul className="footer-list">
                  <li><Link href="/auctions">All auctions</Link></li>
                  <li><Link href="how-works.html">How It Works</Link></li>
                  <li><Link href="about">About Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
              <div className="footer-item">
                <h5>Help & FAQs</h5>
                <ul className="footer-list">
                  <li><Link href="product.html">Complaint</Link></li>
                  <li><Link href="faq.html">Customer FAQs</Link></li>
                  <li><Link href="login.html">Terms and Conditions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row d-flex align-items-center g-4">
            <div
              className="col-lg-6 d-flex justify-content-lg-start justify-content-center"
            >
              <p>
                © Copyright 2022 Benj Bid Inc.
              </p>
            </div>
            <div
              className="col-lg-6 d-flex justify-content-lg-end justify-content-center align-items-center flex-sm-nowrap flex-wrap"
            >
              <ul className="footer-logo-list">
                <li>
                  <Link href="#"
                    ><Image alt="image" src="/assets/images/bg/footer-pay1.png"
                  /></Link>
                </li>
                <li>
                  <Link href="#"
                    ><Image alt="image" src="/assets/images/bg/footer-pay2.png"
                  /></Link>
                </li>
                <li>
                  <Link href="#"
                    ><Image alt="image" src="/assets/images/bg/footer-pay3.png"
                  /></Link>
                </li>
                <li>
                  <Link href="#"
                    ><Image alt="image" src="/assets/images/bg/footer-pay4.png"
                  /></Link>
                </li>
                <li>
                  <Link href="#"
                    ><Image alt="image" src="/assets/images/bg/footer-pay5.png"
                  /></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
