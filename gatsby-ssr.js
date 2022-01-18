/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 * Notes:
 * Faster Loading Google Fonts - https://www.cdnplanet.com/blog/faster-google-webfonts-preconnect/
 */

import React from "react"
export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
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
    <script
      src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      data-language="en"
      charset="UTF-8"
      data-domain-script="64fba379-cc84-440d-b90b-0a32ebabc3a1"
    />,
    <script>function OptanonWrapper() {}</script>,
  ])
  setPostBodyComponents([])
}
