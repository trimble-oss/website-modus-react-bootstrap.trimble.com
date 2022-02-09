import { Dropdown, OverlayTrigger } from "@trimbleinc/modus-react-bootstrap"
import React, { useCallback, useEffect } from "react"
import { StyledContextMenu } from "./styleHelpers"
import { ContextMenuItem } from "./types"

interface ContextMenuProps extends React.HTMLProps<HTMLDivElement> {
  menu: ContextMenuItem[]
  anchorPointX: string | number
  anchorPointY: string | number
  onClose: (...args: any[]) => void
}

export function ContextMenu(
  props: React.PropsWithChildren<ContextMenuProps> & {
    ref?: React.Ref<HTMLDivElement>
  }
): React.ReactElement {
  const {
    menu,
    anchorPointX,
    anchorPointY,
    className,
    onClose,
    children,
    ...rest
  } = props
  const ref = React.useRef(null)

  const handleClickOutside = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose(e)
      }
    },
    [onClose]
  )

  const handleToggle = useCallback((isOpen, e) => {
    if (isOpen) e.preventDefault()
  }, [])

  useEffect(() => {
    if (!(typeof window === "undefined" || !window.document)) {
      window.document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      if (!(typeof window === "undefined" || !window.document)) {
        window.document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [])

  return (
    <StyledContextMenu
      className="list-group"
      ref={ref}
      style={{
        top: anchorPointY,
        left: anchorPointX,
      }}
    >
      {menu.map((item, index) => {
        return item.children ? (
          <Dropdown id={`list_item_${index}`} drop="right">
            <Dropdown.Toggle as="li" className="list-group-item">
              <span style={{ marginRight: "10%" }}>{item.title}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <ul className="list-group">
                {item.children.map((childItem, childIndex) => (
                  <li
                    className="list-group-item"
                    key={`child_list_item_${childIndex}`}
                    onClick={childItem.onClick}
                  >
                    {childItem.title}
                  </li>
                ))}
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <li
            className="list-group-item"
            key={`list_item_${index}`}
            onClick={item.onClick}
          >
            {item.title}
          </li>
        )
      })}
    </StyledContextMenu>
  )
}

export default ContextMenu
