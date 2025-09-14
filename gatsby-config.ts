import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/personal-website",
  siteMetadata: {
    title: `Jonathan Gunawan | Infrastructure & Platform Engineer`,
    siteUrl: `https://jonathangun.github.io/personal-website`,
    description: `Infrastructure & platform engineer specializing in databases, Kubernetes, Terraform, and developer platform automation. ICPC Silver Medalist & Top 100 IEEEXTREME.`,
    author: `Jonathan Yudi Gunawan`,
    twitterUsername: `@jonathanyudigun`,
  image: `/social-card.svg`,
    keywords: [
      'golang','kubernetes','postgresql','redis','terraform','platform engineering','sre','cloud automation','grpc','microservices'
    ],
    social: {
      github: 'https://github.com/JonathanGun',
      linkedin: 'https://www.linkedin.com/in/jonathanyudigun',
      email: 'mailto:jonathanyudigun@gmail.com'
    },
    organization: {
      name: 'GoTo Financial',
      url: 'https://www.goto.com',
      sameAs: ['https://www.linkedin.com/company/gotofinancial/']
    },
    lastUpdated: new Date().toISOString()
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
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jonathan Gunawan's Resume`,
        short_name: `Jonathan Gunawan's Resume`,
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
