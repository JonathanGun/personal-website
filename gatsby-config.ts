import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/new",
  siteMetadata: {
    title: `Jonathan Gunawan` ,
    siteUrl: `https://example.com`,
  description: `Infrastructure & backend engineer focusing on databases, reliability, and developer productivity`,
    author: `@jonathangun`
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images/` }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `data`, path: `${__dirname}/content/` }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jonathan Gunawan Personal Site`,
        short_name: `JG Site`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0d1117`,
        display: `standalone`,
        icon: `src/images/icon.png`
      }
    },
  ]
};

export default config;
