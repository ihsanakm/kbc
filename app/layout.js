import "./globals.css";

export const metadata = {
  title: "KBC Original — Charcoal. Spice. Sold out by midnight.",
  description:
    "Sri Lanka's largest BBQ chicken chain. Whole birds basted in our own island spice blend, slow-grilled over 100% natural coconut-shell charcoal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow+Condensed:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
