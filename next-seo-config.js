const description = "Simple Public Chat Website with Auth and Anonymous Mode";

const imgUrl =
  "https://raw.githubusercontent.com/hyamero/chatti/main/public/assets/thumbnail.png";

export default {
  title: "Chatti | Public Chat",
  description,
  openGraph: {
    type: "website",
    url: "https://daleban.tech",
    title: "Chatti | Public Chat",
    description,
    images: [
      {
        url: imgUrl,
        width: 800,
        height: 600,
        alt: "Chatti",
        type: "image/png",
      },
      {
        url: imgUrl,
        width: 900,
        height: 800,
        alt: "Chatti",
        type: "image/png",
      },
      {
        url: imgUrl,
      },
    ],
    site_name: "Public Chat",
    locale: "en_US",
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
};
