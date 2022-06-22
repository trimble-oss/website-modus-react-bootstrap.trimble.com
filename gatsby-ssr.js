/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 * Notes:
 * Faster Loading Google Fonts - https://www.cdnplanet.com/blog/faster-google-webfonts-preconnect/
 */

import React from "react"
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="fontsGoogleApi"
      rel="dns-prefetch"
      href="https://fonts.googleapis.com"
    ></link>,
    <link
      rel="preconnect"
      key="fontsGstatic"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    ></link>,
    <link
      rel="stylesheet"
      key="fontsOpenSans"
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=fallback"
    ></link>,
    <script
      key="polyfill"
      noModule={true}
      src="https://polyfill.io/v3/polyfill.min.js"
    />,
    <script key="plausible" defer data-domain="modus-react-bootstrap.trimble.com" src="https://plausible.io/js/script.outbound-links.js" />
  ])
}
