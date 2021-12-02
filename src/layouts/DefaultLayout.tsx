import React from "react"
import * as PropTypes from "prop-types"
import Footer from "../common/Footer"
import Header from "../common/Header"
import "../assets/css/main.scss"
import { MenuContext, NavigationInfo } from "../common/MenuContext"
import GetNavigationMenu from "../common/MenuConfiguration"

const propTypes = {
  location: PropTypes.object.isRequired,
}

function CreateMenuContext(routeInfo: string): NavigationInfo {
  const allMenus = GetNavigationMenu()
  const routeItems = routeInfo.split("/")?.filter(item => item)
  const defaultContext = { current: null, menu: null, all: allMenus }

  if (!routeItems || !routeItems.length) return defaultContext

  let parent = allMenus.find(menu => menu.key == routeItems[0])
  if (!parent) return defaultContext

  let activeMenu = parent
  if (routeItems.length > 1 && parent.children) {
    activeMenu = parent.children.find(function (x) {
      return x.key == routeItems[1]
    })
  }
  return { current: activeMenu, menu: parent.children, all: allMenus }
}

function DefaultLayout({ children, location }) {
  const context = CreateMenuContext(location.pathname)

  return (
    <MenuContext.Provider value={context}>
      <Header />
      {children}
      <Footer />
    </MenuContext.Provider>
  )
}

DefaultLayout.propTypes = propTypes

export default DefaultLayout
