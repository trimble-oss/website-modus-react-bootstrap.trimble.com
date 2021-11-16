import PropTypes from "prop-types"
import React from "react"

import MainContent from "../common/MainContent"
import { menuList } from "../common/MenuConfiguration"
import Banner from "../common/Banner"
import { MenuContext, NavigationInfo } from "../common/MenuContext"
import Default from "./DefaultLayout"

//Modus Icon scripts not required for Home page
import { ModusIcons } from "../common/ExternalReferences"

const propTypes = {
  location: PropTypes.object.isRequired,
}

function GetMenuContext(routeInfo: string): NavigationInfo {
  const routeItems = routeInfo.split("/")?.filter(item => item)
  const parent =
    routeItems && menuList.find(x => x.path.endsWith(routeItems[0]))
  if (!parent) return null

  let activeMenu = parent
  if (routeItems.length > 1 && parent.children) {
    activeMenu = parent.children.find(function (x) {
      return x.path.endsWith(routeItems[1])
    })
  }

  return { current: activeMenu, menu: parent.children }
}

function MainLayout({ children, ...props }) {
  const context = GetMenuContext(props.location.pathname)
  const { title, subtitle } = context.current

  return (
    <Default location={props.location} grayscale={false}>
      <ModusIcons />
      <Banner title={title} subtitle={subtitle} />
      <MenuContext.Provider value={context}>
        <MainContent>{children}</MainContent>
      </MenuContext.Provider>
    </Default>
  )
}

MainLayout.propTypes = propTypes

export default MainLayout
