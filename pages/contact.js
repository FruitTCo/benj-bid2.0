'use client'

import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="contact-section pt-120 pb-120">
        <img
          alt="image"
          src="/assets/images/bg/section-bg.png"
          className="img-fluid section-bg-top"
        />
        <img
          alt="image"
          src="/assets/images/bg/section-bg.png"
          className="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row pb-120 mb-70 g-4 d-flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="contact-signle hover-border1 d-flex flex-row align-items-center">
                  <div className="icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="text">
                    <h4>Location</h4>
                    <p>168/170, Ave 01,Old York Drive Rich Mirpur, Dhaka</p>
                  </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="contact-signle hover-border1 d-flex flex-row align-items-center">
                  <div className="icon">
                    <i className="bx bx-phone-call"></i>
                  </div>
                  <div className="text">
                    <h4>Phone</h4>
                    <a href="tel:+2348017742345">+234 801 774 2345</a> <br/>
                    <a href="tel:+2348017742345">+234 801 774 2346</a>
                  </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="contact-signle hover-border1 d-flex flex-row align-items-center">
                  <div className="icon">
                    <i className="bx bx-envelope"></i>
                  </div>
                  <div className="text">
                    <h4>Email</h4>
                    <a href="mailto:benji@benj_bid.com">
                      <span>benji@benj_bid.com</span>
                    </a>
                  </div>
                </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
                {" "}
                <div
                  className="form-wrapper"
                >
                  <div className="form-title2">
                    <h3>Get in Touch</h3>
                    <p className="para">
                      Feel free to ask me any question or let&apos;s do to talk about
                      our future collaboration.
                    </p>
                  </div>
                  <form action="#">
                    <div className="row">
                      <div className="col-xl-6 col-lg-12 col-md-6">
                        <div className="form-inner">
                          <input type="text" placeholder="Your Name :" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-6">
                        <div className="form-inner">
                          <input type="email" placeholder="Your Email :" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-6">
                        <div className="form-inner">
                          <input type="text" placeholder="Your Phone :" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-6">
                        <div className="form-inner">
                          <input type="text" placeholder="Subject :" />
                        </div>
                      </div>
                      <div className="col-12">
                        <textarea
                          name="message"
                          placeholder="Write Message :"
                          rows="12"
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="eg-btn btn--primary btn--md form--btn"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
            <div className="col-lg-6">
                <div
                  className="map-area"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6255252.31904332!2d-106.08810052683293!3d40.04590513383155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1650355365902!5m2!1sen!2sbd"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
