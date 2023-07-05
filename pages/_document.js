import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/gif" sizes="20x20" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/all.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/boxicons.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/css/jquery-ui.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/slick-theme.css" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/odometer.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/assets/js/jquery-3.6.0.min.js"></script>
        <script src="/assets/js/jquery-ui.js"></script>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/slick.js"></script>
        <script src="/assets/js/jquery.nice-select.js"></script>
        <script src="/assets/js/viewport.jquery.js"></script>
        <script src="/assets/js/jquery.magnific-popup.min.js"></script>
        <script src="/assets/js/main.js"></script>
      </body>
    </Html>
  );
}
