const { cleanDoclets } = require("gatsby-transformer-react-docgen/doclets")
const path = require("path")

const defaultDescriptions = require("./src/api-docs/defaultPropDescriptions")
module.exports = {
  siteMetadata: {
    title: `Trimble Modus Bootstrap Developer Guide`,
    description: `The Modus React Bootstrap is a React-based component library extended from react-bootstrap`,
    author: `Trimble Inc.`,
    siteUrl: `https://modus-react-bootstrap.trimble.com/`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/api-docs/react-bootstrap-1.6.4/`,
        name: "api-docs",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/layouts/DefaultLayout"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `modus-react`,
        short_name: `modus-react`,
        start_url: `/`,
        icon: `src/assets/img/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-astroturf",
      // defaults:
      options: {
        tagName: "css",
        styledTag: "styled",
        extension: ".module.css",
      },
    },

    {
      resolve: "gatsby-transformer-react-docgen",
      options: {
        resolver: require("./src/api-docs/resolveHocComponents"),
        handlers: [
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                let prop = docs.getPropDescriptor(name)
                let dflt = defaultDescriptions[name]

                if (dflt && !cleanDoclets(prop.description))
                  prop.description = `${dflt}\n${prop.description}`
              }
            })
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-prismjs"],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
