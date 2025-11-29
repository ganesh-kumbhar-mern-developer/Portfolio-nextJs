export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://gktechhub.com/sitemap.xml",
    host: "https://gktechhub.com",
  };
}
