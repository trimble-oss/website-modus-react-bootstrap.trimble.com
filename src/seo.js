import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
      }
    }
  }
`

const SEO = ({ title, description, pathname }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
        },
      },
    }) => {
      const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
      const pageDesc = description || defaultDescription

      return (
        <>
          <Helmet
            title={pageTitle}
            titleTemplate={titleTemplate}
            htmlAttributes={{
              lang: "en",
            }}
          >
            <meta name="description" content={pageDesc} />
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  article: false,
}
