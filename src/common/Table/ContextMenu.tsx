import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import useContextMenu from "./useContextMenu"
import useEventCallback from "@restart/hooks/useEventCallback"
import { Overlay } from "@trimbleinc/modus-react-bootstrap"
import { ContextMenu } from "./types"

interface ContextMenuProps extends React.HTMLProps<HTMLUListElement> {
  menu: ContextMenu[]
  anchorPointX: string | number
  anchorPointY: string | number
}
// const propTypes = {
//   /**
//    * List of options to display in the context menu pop-up
//    */
//   options: PropTypes.arrayOf(PropTypes.string),
// }

const ContextMenuPopUp = React.forwardRef<HTMLUListElement, ContextMenuProps>(
  ({ menu, anchorPointX, anchorPointY, className, ...props }, ref) => {
    // const listRef = React.useRef(null)
    // const [show, setShow] = React.useState(true)

    // const handleClickOutside = useCallback(
    //   e => {
    //     if (listRef.current && !listRef.current.contains(e.target)) {
    //       if (!(typeof window === "undefined" || !window.document)) {
    //         window.document.removeEventListener("mousedown", handleClickOutside)
    //       }
    //       setShow(false)
    //     }
    //   },
    //   [show]
    // )

    //https://www.gatsbyjs.com/docs/using-client-side-only-packages/
    //Gatsby is a server side rendering framework, some apis, like window and document are not present during the build process,
    //so needed some additional checks

    // useEffect(() => {
    //   debugger
    //   if (!(typeof window === "undefined" || !window.document)) {
    //     window.document.addEventListener("mousedown", handleClickOutside)
    //   }
    //   return () => {
    //     debugger
    //     if (!(typeof window === "undefined" || !window.document)) {
    //       window.document.removeEventListener("mousedown", handleClickOutside)
    //     }
    //   }
    // }, [])

    return (
      <ul
        className="list-group"
        {...props}
        ref={ref}
        style={{
          top: anchorPointY,
          left: anchorPointX,
          position: "absolute",
          zIndex: 9999,
        }}
      >
        {menu.map((item, index) => (
          <li className="list-group-item" key={index} onClick={item.onClick}>
            {item.title}
          </li>
        ))}
      </ul>
    )
  }
)

// ContextMenu.defaultProps = propTypes

export default ContextMenuPopUp
