import { Dropdown, OverlayTrigger } from "@trimbleinc/modus-react-bootstrap"
import React, { useCallback, useEffect } from "react"
import { StyledContextMenu } from "./styleHelpers"
import { ContextMenuItem } from "./types"

interface ContextMenuProps extends React.HTMLProps<HTMLUListElement> {
  menu: ContextMenuItem[]
  anchorPointX: string | number
  anchorPointY: string | number
  onClose: (...args: any[]) => void
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
  menu,
  anchorPointX,
  anchorPointY,
  className,
  onClose,
  ...props
}) => {
  const ref = React.useRef(null)

  const handleClickOutside = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose(e)
      }
    },
    [onClose]
  )

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
      {...props}
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
              {item.children.map((childItem, childIndex) => (
                <Dropdown.Item
                  as="li"
                  key={`child_list_item_${childIndex}`}
                  onClick={childItem.onClick}
                >
                  {childItem.title}
                </Dropdown.Item>
              ))}
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
