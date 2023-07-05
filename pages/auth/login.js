"use client";
import { useRef, useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Login({ providers }) {
  const email = useRef("");
  const password = useRef("");

  function handleClick() {
    signIn("credentials", {
      email: email.current,
      password: password.current,
    });
  }

  const [pasVisibility, setPasswordVisibility] = useState(false)

  return (
    <div className="login-section pt-120 pb-120">
      <img
        alt="imges"
        src="/assets/images/bg/section-bg.png"
        className="img-fluid section-bg-top"
      />
      <img
        alt="imges"
        src="/assets/images/bg/section-bg.png"
        className="img-fluid section-bg-bottom"
      />
      <div className="container">
        <div className="row d-flex justify-content-center g-4">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div
              className="form-wrapper wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay=".2s"
            >
              <div className="form-title">
                <h3>Log In</h3>
                <p>
                  New Member?{" "}
                  {/* Fill in your mail and prefered password below. its that easy. */}
                  <Link href="/auth/sign-up">signup here</Link>
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                action="#"
                className="w-100"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Enter Your Email *</label>
                      <input
                        autoFocus
                        required
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        autoComplete="email"
                        onChange={(e) => (email.current = e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Password *</label>
                      <input
                        required
                        type={pasVisibility ? "text": "password"}
                        minLength={8}
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => (password.current = e.target.value)}
                      />
                      <i onClick={()=>setPasswordVisibility(!pasVisibility)} className={pasVisibility ? "bi bi-eye": "bi bi-eye-slash"} id="togglePassword"></i>
                    </div>
                  </div>
                </div>
                <button onClick={()=>handleClick()} className="account-btn">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders()
  if (session) {
      return {
          redirect: { destination: req.headers.referer  ? req.headers.referer  : "/" },
      };
  }
  return {
      props: {
          providers,
      },
  }
}