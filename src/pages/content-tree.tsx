import React, { useEffect, useState, useMemo, useCallback, useRef } from "react"
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

import useForceUpdate from "@restart/hooks/useForceUpdate"
import { transform } from "lodash"

const StyledIcon = styled("i")`
  line-height: 0.8 !important;
  top: 0 !important;
  position: relative !important;
  display: inline-block !important;
`

const POSITION = { x: 0, y: 0 }

const Draggable = ({ children, id }) => {
  const parentRef = useRef(null)
  const treeItemRef = useRef(null)

  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  )

  const handleMouseDown = useCallback(event => {
    if (treeItemRef.current && !treeItemRef.current.contains(event.target))
      return

    const { clientX, clientY } = event
    setState(prevState => ({
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }))
  }, [])

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      }
      setState(prevState => ({
        ...prevState,
        translation,
      }))
      // if (onDrag) onDrag({ translation, id })
    },
    [state.origin, id]
  )

  const handleMouseUp = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isDragging: false,
    }))

    // if (onDragEnd) onDragEnd()
  }, [])

  useEffect(() => {
    if (state.isDragging) {
      // window.addEventListener("mousemove", handleMouseMove)
      // window.addEventListener("mouseup", handleMouseUp)
    } else {
      // window.removeEventListener("mousemove", handleMouseMove)
      // window.removeEventListener("mouseup", handleMouseUp)

      setState(prevState => ({
        ...prevState,
        translation: POSITION,
      }))
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (parentRef.current && parentRef.current.childNodes) {
      const treeItem = parentRef.current.childNodes[0]
      if (treeItem && treeItem.getAttribute("role") == "treeitem") {
        treeItemRef.current = treeItem
      }
    }
  }, [parentRef])

  useEffect(() => {
    if (treeItemRef.current) {
      let node = treeItemRef.current
      node.style.cursor = state.isDragging ? "-webkit-grabbing" : "-webkit-grab"
      node.style.transform = `translate(${state.translation.x}px, ${state.translation.y}px)`
      node.style.transition = state.isDragging ? "none" : "transform 500ms"
      node.style.zIndex = state.isDragging ? 9999 : 1
      // node.style.position = state.isDragging ? "absolute" : "relative"
    }
  }, [treeItemRef, state.isDragging, state.translation])

  return (
    <div
      ref={parentRef}
      onDragStart={handleMouseDown}
      onDrag={handleMouseMove}
      onDragEnd={handleMouseUp}
      draggable
    >
      {children}
    </div>
  )
}

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
  const [dragItem, setdragItem] = React.useState({})

  // Action Bar Handlers
  const handleExpandAllClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? getNodeIds(data) : []
    )
  }

  // Helpers
  function getNodeIds(array) {
    return array.reduce((r, { nodeId, children }) => {
      r.push(nodeId, ...(children ? getNodeIds(children) : []))
      return r
    }, [])
  }

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
    return (
      <TreeViewItem nodeId={nodeId} label={label} {...props}>
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
    )
  }

  return (
    <div style={{ width: "400px" }}>
      <div className="container">
        <div className="row row-cols-1">
          <div className="col">
            <div>
              <div className="input-with-icon-left">
                <FormControl as="input" placeholder="Search"></FormControl>
                <div className="input-icon">
                  <i className="modus-icons material-icons">search</i>
                </div>
              </div>
            </div>
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
