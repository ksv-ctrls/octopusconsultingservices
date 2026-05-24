const BASE_URL = "";
async function handleGetSitemap() {
  const paths = [
    { p: "/", c: "weekly", pr: "1.0" },
    { p: "/projects", c: "weekly", pr: "0.9" },
    { p: "/about", c: "monthly", pr: "0.7" },
    { p: "/contact", c: "monthly", pr: "0.7" },
  ];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map(
      (u) =>
        `  <url><loc>${BASE_URL}${u.p}</loc><changefreq>${u.c}</changefreq><priority>${u.pr}</priority></url>`,
    ),
    "</urlset>",
  ].join("\n");
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
export { handleGetSitemap };
