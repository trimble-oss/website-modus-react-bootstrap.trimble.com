import * as React from "react"
import SEO from "../../seo"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../../common/ExternalDependencyHelper"

export default function Layout({
  prefix,
  title,
  items,
  excludeSEO,
  excludeIconScript,
  excludeLayoutScript,
  children,
  ...props
}) {
  return (
    <>
      {!excludeSEO && <SEO title={title} description={title} />}
      {!excludeIconScript && <ModusIconsScripts />}
      {!excludeLayoutScript && <ModusLayoutScripts />}
      <h2
        id={`${prefix}-${title.replace(" ", "")}`}
        className="font-weight-bold"
      >
        {title}
      </h2>
      <div className="grid-layout">{children}</div>
    </>
  )
}
