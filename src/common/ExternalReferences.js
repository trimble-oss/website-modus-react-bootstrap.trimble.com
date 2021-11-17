import React from "react"

// React Helmet manages changes to document head
import { Helmet } from "react-helmet"

export const ModusIcons = () => {
  return (
    <div>
      <Helmet htmlAttributes={true}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://modus.trimble.com/assets/0.5.1/fonts/modus-icons.css"
        />
      </Helmet>
    </div>
  )
}
export const ModusLayout = () => {
  return (
    <div>
      <Helmet htmlAttributes={true}>
        <link
          rel="stylesheet"
          href="https://modus.trimble.com/css/modus-layout.min-1.3.0.css"
        />
        ,
        <script
          src="https://modus.trimble.com/css/modus-layout.min-1.3.0.js"
          async
        />
      </Helmet>
    </div>
  )
}
