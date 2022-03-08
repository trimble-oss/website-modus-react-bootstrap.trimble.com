import * as React from "react"
import { Container, Form, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../common/ExternalDependencyHelper"
import TreeViewItem from "../common/Tree/TreeViewItem"
import TreeView from "../common/Tree/TreeView"
import styled from "styled-components"

function TreeViewWithIcon() {
  const StyledIcon = styled("i")`
    line-height: 0.8 !important;
    top: 0 !important;
    position: relative !important;
    display: inline-block !important;
  `

  type Node = {
    nodeId: number
    label?: string
    children?: Node[]
    isNew?: boolean
  }
  const [data, setData] = React.useState<Node[]>([
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
      nodeId: 11,
      label: "Archived",
      children: [
        {
          nodeId: 12,
          label: "Folder1",
          children: [
            {
              nodeId: 13,
              label: "Folder2",
              children: [{ nodeId: 15, label: "File1" }],
            },
            { nodeId: 14, label: "File2" },
          ],
        },
        { nodeId: 16, label: "File3" },
      ],
    },
  ])

  const [expanded, setExpanded] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const [editableNode, setEditableNode] = React.useState<number | null>()

  // Action Bar Handlers
  const handleExpandAllClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? getNodeIds(data) : []
    )
  }

  const handleAddClick = () => {
    const newNodeId = getNodeIds(data).length + 1
    setData(prevState => {
      const newNode = {
        nodeId: newNodeId,
        label: "",
        isNew: true,
        children: [],
      }
      return [newNode, ...prevState]
    })
  }

  const handleEditClick = (event: any) => {
    if (!selected || selected.length === 0) return
    setEditableNode(selected[0])
  }

  const handleDeleteClick = (event: any) => {
    if (!selected || selected.length === 0) return
    const nodeId = selected[0]
    setData(prevState => {
      let newData = prevState.filter(f => f.nodeId !== nodeId)
      if (prevState.length !== newData.length) {
        return newData
      }
      for (let i = 0; i < newData.length; i++) {
        deleteNodeFromTree(newData[i], nodeId)
      }
      return newData
    })
  }

  // Tree View Handlers
  const handleAddNode = (event, nodeId, label) => {
    let newData = data.filter(item => !item.isNew)
    newData.unshift({ nodeId, label, children: [] })
    setData(newData)
  }

  const handleEditNode = (event, nodeId, label) => {
    setData(prevState => {
      let newData = prevState
      for (let i = 0; i < newData.length; i++) {
        updateNodeLabel(newData[i], nodeId, label)
      }
      return newData
    })
    setEditableNode(null)
  }

  const handleSelect = (event: any, nodeIds: number[]) => {
    setSelected(nodeIds)
  }

  // Helpers
  function getNodeIds(array): number[] {
    return array.reduce((r, { nodeId, children }) => {
      r.push(nodeId, ...(children ? getNodeIds(children) : []))
      return r
    }, [])
  }

  function updateNodeLabel(node, nodeId, label) {
    if (node.nodeId == nodeId) {
      node.label = label
    } else if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
        updateNodeLabel(node.children[i], nodeId, label)
      }
    }
  }

  function deleteNodeFromTree(node, nodeId) {
    if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
        let filtered = node.children.filter(f => f.nodeId == nodeId)
        if (filtered && filtered.length > 0) {
          node.children = node.children.filter(f => f.nodeId != nodeId)
          return
        }
        deleteNodeFromTree(node.children[i], nodeId)
      }
    }
  }

  // Components
  const CustomTreeViewItem = ({
    nodeId,
    isNew,
    label,
    children,
    onNodeAdd,
    onNodeEdit,
    ...props
  }) => {
    const isEditable = editableNode === nodeId
    const handleOnKeyUp = e => {
      if (e.key === "Enter" || e.keyCode === 13) {
        if (isNew) onNodeAdd(e, nodeId, e.target.value)
        else if (isEditable) onNodeEdit(e, nodeId, e.target.value)
      }
    }
    if (isNew) {
      return (
        <li className="list-group-item">
          <Form.Control
            as="input"
            autoFocus
            onKeyUp={handleOnKeyUp}
            size="lg"
            className="border-0"
          ></Form.Control>
        </li>
      )
    }

    return (
      <>
        <TreeViewItem
          nodeId={nodeId}
          label={
            isEditable ? (
              <Form.Control
                as="input"
                autoFocus
                onKeyUp={handleOnKeyUp}
                size="lg"
                className="border-0"
              ></Form.Control>
            ) : (
              label
            )
          }
        >
          {children &&
            children.map(item => (
              <CustomTreeViewItem
                nodeId={item.nodeId}
                children={item.children}
                label={item.label}
                isNew={item.isNew}
                onNodeAdd={handleAddNode}
                onNodeEdit={handleEditNode}
              />
            ))}
        </TreeViewItem>
      </>
    )
  }
  return (
    <div className="container w-50">
      <div className="row row-cols-1">
        <div className="col">
          <div
            className="d-flex justify-content-end align-items-center"
            style={{ minHeight: "3rem" }}
          >
            <button
              className="btn btn-icon-only btn-text-dark"
              onClick={handleDeleteClick}
            >
              <StyledIcon className="material-icons">delete</StyledIcon>
            </button>
            <button className="btn btn-icon-only btn-text-dark" disabled>
              <StyledIcon className="material-icons">content_copy</StyledIcon>
            </button>
            <button
              className="btn btn-icon-only btn-text-dark"
              onClick={handleEditClick}
            >
              <StyledIcon className="material-icons">edit</StyledIcon>
            </button>
            <button
              className="btn btn-icon-only btn-text-dark"
              onClick={handleAddClick}
            >
              <StyledIcon className="material-icons">add</StyledIcon>
            </button>
            <button className="btn btn-icon-only btn-text-dark" disabled>
              <StyledIcon className="material-icons">drag_indicator</StyledIcon>
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
          <TreeView
            id="example"
            expanded={expanded}
            onNodeSelect={handleSelect}
          >
            {data.map(item => (
              <CustomTreeViewItem
                nodeId={item.nodeId}
                children={item.children}
                label={item.label}
                isNew={item.isNew}
                onNodeAdd={handleAddNode}
                onNodeEdit={handleEditNode}
              />
            ))}
          </TreeView>
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
                  <TreeViewWithIcon />
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
