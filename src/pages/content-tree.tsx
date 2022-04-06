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

const StyledIcon = styled("i")`
  line-height: 0.8 !important;
  top: 0 !important;
  position: relative !important;
  display: inline-block !important;
`
function TreeViewWithFilter() {
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
  ]
  const [data, setData] = React.useState(initialData)
  const [expanded, setExpanded] = React.useState([])
  const POSITION = { x: 0, y: 0 }
  const [draggingState, setDraggingState] = React.useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    width: "0px",
    height: "0px",
    node: {},
  })
  const [droppableNode, setDroppableNode] = useState()
  const [draggingNode, setDraggingNode] = useState()
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
    setDroppableNode(null)

    setDraggingState(prevState => ({
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
      node,
      width:
        (target && target.offsetParent && target.offsetParent.width) || "400px",
      height:
        (target && target.offsetParent && target.offsetParent.height) || "40px",
    }))
  }

  const handleMouseMove = useCallback(
    event => {
      const { clientX, clientY, target } = event

      const translation = {
        x: clientX,
        y: clientY,
      }
      setDraggingState(prevState => ({
        ...prevState,
        translation,
      }))

      const dropNode = getDroppableNode(clientX, clientY)
      if (dropNode) setDroppableNode(dropNode.id)
      else setDroppableNode(null)
    },
    [draggingState.origin]
  )

  const handleMouseUp = useCallback(event => {
    setDraggingState(prevState => ({
      ...prevState,
      isDragging: false,
    }))

    setDroppableNode(null)
  }, [])

  useEffect(() => {
    if (draggingState.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)

      setDraggingState(prevState => ({
        ...prevState,
        translation: POSITION,
      }))
    }
  }, [draggingState.isDragging])

  // Helpers
  function getNodeIds(array) {
    return array.reduce((r, { nodeId, children }) => {
      r.push(nodeId, ...(children ? getNodeIds(children) : []))
      return r
    }, [])
  }

  const getDroppableNode = React.useCallback((x: any, y: any) => {
    const node = treeItemRefs.current.find(({ nodeId, ref, isDroppable }) => {
      if (!isDroppable) return false

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
      width: draggingState.width,
      height: draggingState.height,
      transform: `translate(calc(${draggingState.translation.x}px - 10%), calc(${draggingState.translation.y}px - 50%))`,
      msTransform: `translateX(${draggingState.translation.x}px) translateX(-10%) translateY(${draggingState.translation.y}px) translateY(-50%)`,
      zIndex: 1000,
      left: 0,
      top: 0,
      cursor: draggingState.isDragging ? "-webkit-grabbing" : "-webkit-grab",
    }),
    [draggingState]
  )

  // Components
  const CustomTreeViewItem = ({
    nodeId,
    isNew,
    label,
    children,
    onNodeAdd,
    onNodeEdit,
    onChange,
    ...props
  }) => {
    const ref = useRef(null)
    useEffect(() => {
      registerTreeItem({ nodeId, label }, ref.current)
      return () => {
        unRegisterTreeItem(nodeId)
      }
    }, [ref.current])

    return (
      <>
        <TreeViewItem
          nodeId={nodeId}
          label={label}
          {...props}
          ref={ref}
          dragIcon={
            <i
              className="material-icons"
              onMouseDown={e => handleMouseDown(e, { nodeId, label })}
            >
              drag_indicator
            </i>
          }
        >
          {children &&
            children.map(item => (
              <CustomTreeViewItem
                nodeId={item.nodeId}
                children={item.children}
                label={item.label}
                key={item.nodeId}
              />
            ))}
        </TreeViewItem>
      </>
    )
  }

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
              <button className="btn btn-icon-only btn-text-dark" disabled>
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
              {data.map(item => (
                <CustomTreeViewItem
                  nodeId={item.nodeId}
                  children={item.children}
                  label={item.label}
                  key={item.nodeId}
                />
              ))}
            </TreeView>
          </div>
        </div>
      </div>
      {draggingState.isDragging &&
        bodyRef.current &&
        createPortal(
          <div
            className="list-group d-inline-block position-fixed"
            style={dragItemStyle}
          >
            <li className="modus-tree-view-item list-group-item list-item-left-control">
              <div className="d-flex align-items-center">
                <i className="material-icons">drag_indicator</i>
              </div>
              <div className="d-flex align-items-center">
                {draggingState.node.label}
              </div>
            </li>
          </div>,
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
