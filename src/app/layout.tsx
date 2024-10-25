import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Suburb Walkability</title>
        <meta
          property="og:description"
          content="Draw points from a GeoJSON collection to a map."
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
        />
        <style>
          {`
            body {
              margin: 0;
              overflow: hidden;
            }
          `}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
