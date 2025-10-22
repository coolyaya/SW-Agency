/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.sw-entertainment.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "monthly",
      priority: path === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
