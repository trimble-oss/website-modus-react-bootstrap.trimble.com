import * as React from "react"
import {
  Container,
  Form,
  FormControl,
  Row,
} from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../common/ExternalDependencyHelper"
import TreeViewItem from "../common/Tree/TreeViewItem"
import TreeView from "../common/Tree/TreeView"
import styled from "styled-components"
import findIndex from "lodash/findIndex"
import { TreeNode as Node } from "../examples/components/ContentTree"
import { useEffect, useCallback, useState, useMemo, useRef } from "react"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { createPortal } from "react-dom"
import classNames from "classnames"

const StyledIcon = styled("i")`
  line-height: 0.8 !important;
  top: 0 !important;
  position: relative !important;
  display: inline-block !important;
`
const StyledDragItem = styled.div`
  opacity: 0.9;
  li {
    :hover {
      background: white;
    }
    &.drop-allow {
      border: 2px dashed #0063a3 !important;
    }
    &.drop-block {
      border: 2px dashed red !important;
    }
  }
`

const StyledCustomTreeViewItem = styled.div`
  .drop-allow {
    li:first-child {
      border-top: 2px solid #0063a3 !important;
    }
  }
  .drop-block {
    li:first-child {
      border-top: 2px solid red !important;
    }
  }
`
const disabledNodes = [14]
// Components
const CustomTreeViewItem = ({
  nodeId,
  isNew,
  label,
  parentId,
  children,
  onNodeAdd,
  onNodeEdit,
  onChange,
  registerTreeItem,
  unRegisterTreeItem,
  handleMouseDown,
  draggable: draggableProp,
  ...props
}) => {
  const ref = useRef(null)
  const [draggableOnHover, setDraggableOnHover] = useState(false)
  const isDisabled = disabledNodes.includes(nodeId)
  useEffect(() => {
    registerTreeItem(
      {
        nodeId,
        label,
        draggable: draggableProp && !isDisabled,
        droppable: !isDisabled,
        parentId,
      },
      ref.current
    )
    return () => {
      unRegisterTreeItem(nodeId)
    }
  }, [nodeId, label, draggableProp, isDisabled, ref.current])

  return (
    <>
      <TreeViewItem
        nodeId={nodeId}
        label={label}
        {...props}
        ref={ref}
        disabled={isDisabled}
        dragIcon={
          draggableProp ? (
            <i
              className="material-icons"
              onMouseDown={e => handleMouseDown(e, { nodeId, label })}
            >
              drag_indicator
            </i>
          ) : (
            <></>
          )
        }
      >
        {children &&
          children.map(item => (
            <CustomTreeViewItem
              nodeId={item.nodeId}
              children={item.children}
              parentId={nodeId}
              label={item.label}
              key={item.nodeId}
              registerTreeItem={registerTreeItem}
              unRegisterTreeItem={unRegisterTreeItem}
              handleMouseDown={handleMouseDown}
              draggable={draggableProp}
            />
          ))}
      </TreeViewItem>
    </>
  )
}

function TreeViewWithFilter() {
  const POSITION = { x: 0, y: 0 }
  const initialData = [
    {
      nodeId: 1,
      label: "Inbox",
      children: [
        { nodeId: 2, label: "Personal" },
        { nodeId: 3, label: "Work" },
        { nodeId: 4, label: "Community" },
        { nodeId: 5, label: "Social" },
        { nodeId: 6, label: "Friends" },
        { nodeId: 7, label: "More..." },
      ],
    },
    {
      nodeId: 8,
      label: "Archived",
      children: [
        {
          nodeId: 9,
          label: "Folder1",
          children: [
            {
              nodeId: 10,
              label: "Folder2",
              children: [{ nodeId: 13, label: "File1" }],
            },
            { nodeId: 11, label: "File2" },
          ],
        },
        { nodeId: 12, label: "File3" },
      ],
    },
    {
      nodeId: 14,
      label: "Disabled Node",
    },
  ]
  const [data, setData] = React.useState(initialData)
  const [expanded, setExpanded] = React.useState([])
  const [drag, setDrag] = useState(false)
  const forceUpdate = useForceUpdate()

  const draggingState = useRef({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
    node: null,
  })
  const droppingState = useRef({ node: null, validTarget: null })
  const treeItemRefs = useRef([])
  const bodyRef = useRef(null)

  useEffect(() => {
    bodyRef.current = document.body
  }, [])

  // Action Bar Handlers
  const registerTreeItem = (node, ref) => {
    treeItemRefs.current.push({ ...node, ref })
  }

  const unRegisterTreeItem = nodeId => {
    treeItemRefs.current = treeItemRefs.current.filter(
      node => node.nodeId !== nodeId
    )
  }

  const handleExpandAllClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? getNodeIds(data) : []
    )
  }

  const handleMouseDown = (event, node) => {
    const { clientX, clientY, target } = event
    clearDroppingState()

    const prevState = draggingState.current
    draggingState.current = {
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
      node,
      width:
        (target && target.offsetParent && target.offsetParent.width) || "400px",
      height:
        (target && target.offsetParent && target.offsetParent.height) || "40px",
    }
    forceUpdate()
  }

  const handleMouseMove = useCallback(
    event => {
      clearDroppingState()
      const { clientX, clientY, target } = event

      const translation = {
        x: clientX,
        y: clientY,
      }

      const prevState = draggingState.current
      draggingState.current = {
        ...prevState,
        translation,
      }

      const dropNode = getDroppableNode(clientX, clientY)
      if (dropNode) {
        droppingState.current.node = dropNode

        if (
          dropNode.droppable &&
          dropNode.parentId !== draggingState.current.node.nodeId
        ) {
          droppingState.current.validTarget = true
          dropNode.ref.classList.add("drop-allow")
        } else {
          droppingState.current.validTarget = false
          dropNode.ref.classList.add("drop-block")
        }
      }
      forceUpdate()
    },
    [draggingState.current.origin]
  )

  const handleMouseUp = useCallback(event => {
    const prevDragState = draggingState.current

    if (
      droppingState.current.validTarget &&
      droppingState.current.node &&
      draggingState.current.node
    ) {
      const dropNode = droppingState.current.node.nodeId
      const dragNode = draggingState.current.node.nodeId

      setData(prevState => {
        let dragNodeOriginal = {}
        const newData = updateNodes(
          [...prevState],
          dragNode,
          (nodeIndex, nodes) => {
            dragNodeOriginal = nodes[nodeIndex]
            nodes.splice(nodeIndex, 1)
          }
        )

        return updateNodes(newData, dropNode, (nodeIndex, nodes) =>
          nodes.splice(nodeIndex, 0, dragNodeOriginal)
        )
      })
    }

    draggingState.current = {
      ...prevDragState,
      isDragging: false,
    }
  }, [])

  const handleDrag = useCallback(event => {
    setDrag(prevState => !prevState)
  }, [])

  function updateNodes(nodes, nodeId, action) {
    if (!nodes) return nodes
    let nodeIndex = findIndex(nodes, node => node.nodeId === nodeId)
    if (nodeIndex >= 0) {
      action(nodeIndex, nodes)
    } else {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].children = updateNodes(nodes[i].children, nodeId, action)
      }
    }
    return nodes
  }

  useEffect(() => {
    if (draggingState.current.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)

      const prevState = draggingState.current
      draggingState.current = {
        ...prevState,
        translation: POSITION,
        node: null,
      }
      clearDroppingState()
      forceUpdate()
    }
  }, [draggingState.current.isDragging])

  function clearDroppingState() {
    if (droppingState.current.node) {
      droppingState.current.node.ref.classList.remove("drop-allow")
      droppingState.current.node.ref.classList.remove("drop-block")
      droppingState.current.validTarget = null
    }
    droppingState.current.node = null
  }

  // Helpers
  function getNodeIds(array) {
    return array.reduce((r, { nodeId, children }) => {
      r.push(nodeId, ...(children ? getNodeIds(children) : []))
      return r
    }, [])
  }

  function getChildren(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].children) {
        if (array[i].nodeId === id) return getNodeIds(array[i].children)
        let childNodes = getChildren(array[i].children, id)
        if (childNodes.length) return childNodes
      }
    }
    return []
  }

  const getDroppableNode = React.useCallback((x: any, y: any) => {
    const node = treeItemRefs.current.find(({ nodeId, ref }) => {
      const rect = ref.getBoundingClientRect()
      if (rect) {
        const inVerticalBounds = y >= rect.top && y <= rect.bottom
        const inHorizontalBounds = x >= rect.left && x <= rect.right
        return inVerticalBounds && inHorizontalBounds
      }
      return false
    })
    return node
  }, [])

  const dragItemStyle = useMemo(
    () => ({
      width: draggingState.current.width,
      height: draggingState.current.height,
      transform: `translate(calc(${draggingState.current.translation.x}px - 10%), calc(${draggingState.current.translation.y}px - 50%))`,
      msTransform: `translateX(${draggingState.current.translation.x}px) translateX(-10%) translateY(${draggingState.current.translation.y}px) translateY(-50%)`,
      zIndex: 1000,
      left: 0,
      top: 0,
      cursor: draggingState.current.isDragging
        ? "-webkit-grabbing"
        : "-webkit-grab",
    }),
    [draggingState.current]
  )

  return (
    <div style={{ width: "400px" }}>
      <div className="container">
        <div className="row row-cols-1">
          <div className="col">
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ minHeight: "3rem" }}
            >
              <button className="btn btn-icon-only btn-text-dark" disabled>
                <StyledIcon className="material-icons">delete</StyledIcon>
              </button>
              <button className="btn btn-icon-only btn-text-dark" disabled>
                <StyledIcon className="material-icons">content_copy</StyledIcon>
              </button>
              <button className="btn btn-icon-only btn-text-dark" disabled>
                <StyledIcon className="material-icons">edit</StyledIcon>
              </button>
              <button className="btn btn-icon-only btn-text-dark" disabled>
                <StyledIcon className="material-icons">add</StyledIcon>
              </button>
              <button
                className="btn btn-icon-only btn-text-dark"
                onClick={handleDrag}
              >
                <StyledIcon className="material-icons">
                  drag_indicator
                </StyledIcon>
              </button>
              <button
                className="btn btn-icon-only btn-text-dark"
                onClick={handleExpandAllClick}
              >
                <StyledIcon className="material-icons">
                  {expanded.length === 0 ? "unfold_more" : "unfold_less"}
                </StyledIcon>
              </button>
            </div>
          </div>
          <div className="col">
            <TreeView id="example" expanded={expanded}>
              <StyledCustomTreeViewItem>
                {data.map(item => (
                  <CustomTreeViewItem
                    nodeId={item.nodeId}
                    children={item.children}
                    label={item.label}
                    key={item.nodeId}
                    registerTreeItem={registerTreeItem}
                    unRegisterTreeItem={unRegisterTreeItem}
                    handleMouseDown={handleMouseDown}
                    draggable={drag}
                  />
                ))}
              </StyledCustomTreeViewItem>
            </TreeView>
          </div>
        </div>
      </div>
      {draggingState.current.isDragging &&
        bodyRef.current &&
        createPortal(
          <StyledDragItem
            className="list-group d-inline-block position-fixed"
            style={dragItemStyle}
          >
            <li
              className={classNames(
                "list-group-item list-item-left-control",
                droppingState.current.validTarget ? "drop-allow" : "drop-block"
              )}
            >
              <div className="d-flex align-items-center">
                <i className="material-icons" style={{ fontSize: "1rem" }}>
                  drag_indicator
                </i>
              </div>
              <div className="d-flex align-items-center">
                {draggingState.current.node
                  ? draggingState.current.node.label
                  : ""}
              </div>
            </li>
          </StyledDragItem>,
          bodyRef.current
        )}
    </div>
  )
}

const ContentTreePage = props => {
  return (
    <DefaultLayout location={props.location}>
      <main id="main">
        <Container fluid className="pt-5">
          <Container>
            <Row>
              <div className="col-12 col-lg-6 pt-5 mt-xl-5">
                <h1 className=" mt-4 ">
                  <ModusIconsScripts />
                  <ModusLayoutScripts />
                  <TreeViewWithFilter />
                </h1>
              </div>
            </Row>
          </Container>
        </Container>
      </main>
    </DefaultLayout>
  )
}

export default ContentTreePage
