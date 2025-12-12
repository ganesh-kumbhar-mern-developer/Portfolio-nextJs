"use client";

const JsonLdSchemas = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Kumbhar",
    alternateName: [
      "Er. Ganesh Kumbhar",
      "Ganesh Kumbhar Web Developer",
      "Ganesh Kumbhar React Developer",
      "Ganesh Kumbhar MERN Developer",
      "Ganesh Web Developer",
      "Ganesh Full Stack Developer",
      "Ganesh K.",
    ],
    additionalName: ["Ganesh", "Kumbhar"],
    jobTitle: "MERN Stack Developer",
    description:
      "Ganesh Kumbhar – MERN Stack Developer, React.js Developer, Full Stack Web Developer, Freelancer, Website Builder based in Pune, India.",
    email: "mailto:ganeshhh2003@gmail.com",
    telephone: "+919096378354",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411004",
      addressCountry: "IN",
    },
    url: "https://gktechhub.com",
    image: "https://gktechhub.com/og-image.png",
    brand: {
      "@type": "Brand",
      name: "GK TechHub",
      alternateName: ["gktechhub", "GK Tech Hub"],
      url: "https://gktechhub.com",
      slogan: "Professional MERN Stack Developer Portfolio",
    },
    sameAs: [
      "https://github.com/ganesh-kumbhar-mern-developer",
      "https://www.linkedin.com/in/ganesh-kumbhar-mern-developer",
      "https://www.hackerrank.com/profile/ganeshhh2003",
      "https://www.instagram.com/ganesh_kumbhar_211",
      "https://www.facebook.com/ganeshkumbhar211",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Karmayogi Institute of Technology, Pandharpur",
    },
    knowsAbout: [
      "MERN Stack",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "REST APIs",
      "Micro Frontends",
      "UI/UX",
      "Tailwind CSS",
      "Bootstrap",
      "AWS Basics",
      "Git/GitHub",
      "Freelancing",
      "Website Builder",
    ],
    keywords: [
      "Ganesh Kumbhar",
      "Er. Ganesh Kumbhar",
      "Ganesh Kumbhar Web Developer",
      "React Developer",
      "MERN Developer",
      "Full Stack Developer",
      "Freelancer",
      "Website Builder",
      "GK TechHub",
      "gktechhub",
      "Ganesh Portfolio",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GK TechHub – Portfolio of Ganesh Kumbhar",
    alternateName: [
      "Ganesh Kumbhar Portfolio",
      "GK TechHub",
      "gktechhub",
      "Ganesh MERN Portfolio",
    ],
    url: "https://gktechhub.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gktechhub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    keywords: [
      "GK TechHub",
      "gktechhub",
      "Ganesh Kumbhar",
      "Portfolio",
      "React Developer",
      "MERN Stack Developer",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gktechhub.com",
      },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Dream Homes – Real Estate Website",
    description:
      "Dream Homes – A modern real estate application with property listings for 2BHK, 3BHK, 4BHK, penthouses, villas, studios, duplexes, and townhouses for rent and sale. Developed by MERN & React Developer Ganesh Kumbhar.",
    image: "https://gktechhub.com/dream-homes/og-image.jpg",
    url: "https://gktechhub.com/dream-homes",
    creator: {
      "@type": "Person",
      name: "Ganesh Kumbhar",
      url: "https://gktechhub.com",
    },
    dateCreated: "2025-01-15",
    keywords: [
      "Real Estate Website",
      "Property Listings",
      "React Developer",
      "Frontend Developer",
      "Buy Property",
      "Rent Property",
      "Dream Homes",
      "MERN Real Estate Project",
    ],
    inLanguage: "en",
  };

  const employeeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Kumbhar",
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Seven Mentor Pvt. Ltd.",
    },
    sameAs: [
      "https://github.com/ganesh-kumbhar-mern-developer",
      "https://www.linkedin.com/in/ganesh-kumbhar-mern-developer",
      "https://www.hackerrank.com/profile/ganeshhh2003",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Karmayogi Institute of Technology, Pandharpur",
    },
    url: "https://gktechhub.com",
    email: "mailto:ganeshhh2003@gmail.com",
    telephone: "+91 9096378354",
  };

  const occupationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ganesh Kumbhar",
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Seven Mentor Corporate Services Pvt. Ltd.",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Karmayogi Institute of Technology, Pandharpur",
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "ReactJs Developer",
        description:
          "Developing full-stack MERN applications, micro-frontend architecture, secure REST APIs, and NodeMailer OAuth2.0 integration.",
        startDate: "2025-02",
        employmentType: "Full-time",
      },
      {
        "@type": "Occupation",
        name: "ReactJs Developer (Internship)",
        description:
          "Contributed to MERN stack development, CMS/LMS modules, role-based access control, and responsive UI implementation.",
        startDate: "2024-10",
        endDate: "2025-01",
        employmentType: "Internship",
      },
    ],
    url: "https://gktechhub.com",
    sameAs: [
      "https://github.com/ganesh-kumbhar-mern-developer",
      "https://www.linkedin.com/in/ganesh-kumbhar-mern-developer",
      "https://www.hackerrank.com/profile/ganeshhh2003",
    ],
    keywords: [
      "React Developer",
      "MERN Stack Developer",
      "Full Stack Developer",
      "Ganesh Kumbhar",
      "gktechhub",
    ],
  };

  const schemas = [
    personSchema,
    websiteSchema,
    breadcrumbSchema,
    creativeWorkSchema,
    employeeSchema,
    occupationSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
};

export default JsonLdSchemas;
