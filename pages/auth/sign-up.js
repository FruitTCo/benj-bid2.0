"use client";

import { getProviders, getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const errorRef = useRef()

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [pasVisibility, setPasswordVisibility] = useState({
    a: false,
    b: false,
  });

  async function submitForm(e) {
    e.preventDefault();
    setError("")

    if (formValues.password !== formValues.checkPassword) {
      console.log(formValues);
      errorRef.current.scrollIntoView()  
      return setError("password doesn't not match");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          password: formValues.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });

    } catch (error) {
      setError(error);
    }
  }

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
      <div ref={errorRef} className="container">
        <div className="row d-flex justify-content-center g-4">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div
              className="form-wrapper wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay=".2s"
            >
              <div className="form-title">
                <h3>Sign Up</h3>
                <p>
                  Do you already have an account?{" "}
                  <Link href="/auth/login">Log in here</Link>
                </p>
                <small>{error}</small>
              </div>
              <form onSubmit={(e) => submitForm(e)} className="w-100">
                <div className="row">
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>First Name *</label>
                      <input
                        value={formValues.firstname}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            firstname: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Frist Name"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>Last Name *</label>
                      <input
                        // value={formValues.lastname}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            lastname: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Enter Your Email *</label>
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        placeholder="Enter Your Email"
                        value={formValues.email}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Password *</label>
                      <input
                        required
                        type={pasVisibility.a ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={formValues.password}
                        minLength={8}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            password: e.target.value,
                          })
                        }
                      />
                      <i
                        onClick={() =>
                          setPasswordVisibility({ a: !pasVisibility.a, b: pasVisibility.b })
                        }
                        className={
                          pasVisibility.a ? "bi bi-eye" : "bi bi-eye-slash"
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Confirm Password *</label>
                      <input
                        required
                        type={pasVisibility.b ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        minLength={8}
                        placeholder="Password"
                        value={formValues.checkPassword}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            checkPassword: e.target.value,
                          })
                        }
                      />
                      <i
                        onClick={() =>
                          setPasswordVisibility({ b: !pasVisibility.b, a: pasVisibility.a })
                        }
                        className={
                          pasVisibility.b ? "bi bi-eye" : "bi bi-eye-slash"
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                      <div className="form-check pl-0">
                        <input
                          required
                          className="form-check-input"
                          type="checkbox"
                          id="defaultCheck1"
                          name="consent"
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                          I agree to the <Link href="#">Terms & Policy</Link>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="account-btn">
                  Sign up
                </button>
              </form>
              <div className="form-poicy-area mt-5">
                <p>
                  By clicking the &quot;signup&quot; button, you create an
                  Auction Africa account, and you agree to Auction Africa&apos;s{" "}
                  <Link href="#">Terms & Conditions</Link> &
                  <Link href="#">Privacy Policy.</Link>
                </p>
              </div>
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