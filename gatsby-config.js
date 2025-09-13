module.exports = {
  pathPrefix: "/new",
  siteMetadata: {
    title: `Jonathan Gunawan`,
    siteUrl: `https://example.com`,
    description: `Infrastructure & backend engineer focusing on databases, reliability, and developer productivity`,
    author: `@jonathangun`
  },
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
    `gatsby-plugin-react-helmet`
  ]
};