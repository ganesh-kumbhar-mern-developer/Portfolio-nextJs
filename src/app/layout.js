import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://gktechhub.com"),

  title: {
    default:
      "Ganesh Kumbhar – MERN Stack Developer | React.js, Next.js, Node.js Expert",
    template: "%s | Ganesh Kumbhar",
  },

  description:
    "Portfolio of Ganesh Kumbhar – MERN Stack Developer with 1.2+ years of experience in React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, micro-frontends, CMS, and scalable full-stack applications. Based in Pune, India. Open to full-time and freelance opportunities in 2024–2025.",

  keywords: [
    "Ganesh Kumbhar",
    "MERN Stack Developer",
    "MERN Developer Pune",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Hire MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Portfolio Website 2025",
    "React.js Projects",
    "Next.js Projects",
    "JavaScript Projects",
    "Web Developer Pune",
    "Software Developer Portfolio",
    "Best MERN Developer 2025",
  ],

  authors: [{ name: "Ganesh Kumbhar", url: "https://gktechhub.com" }],
  creator: "Ganesh Kumbhar",
  publisher: "GK TechHub",

  alternates: {
    canonical: "https://gktechhub.com",
  },

  openGraph: {
    title:
      "Ganesh Kumbhar – MERN Stack Developer | React.js & Next.js Portfolio",
    description:
      "Explore the full-stack portfolio of Ganesh Kumbhar, MERN Stack Developer specializing in React.js, Next.js, Node.js, and scalable enterprise applications.",
    url: "https://gktechhub.com",
    siteName: "GK TechHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ganesh Kumbhar Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Ganesh Kumbhar – MERN Stack Developer | React.js & Next.js Portfolio",
    description:
      "Full-stack developer portfolio showcasing MERN, React.js, Next.js, Node.js, MongoDB and real-world projects.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
