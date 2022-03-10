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
import findIndex from "lodash/findIndex"
import { TreeNode as Node } from "../examples/components/ContentTree"

function TreeViewWithActionBar() {
  const StyledIcon = styled("i")`
    line-height: 0.8 !important;
    top: 0 !important;
    position: relative !important;
    display: inline-block !important;
  `

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
  const nodesSelected = selected && selected.length > 1

  // Action Bar Handlers
  const handleExpandAllClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? getNodeIds(data) : []
    )
  }

  const handleAddClick = () => {
    setData(prevState => {
      const nodeId = selected[0] || data[0].nodeId
      const newNodeId = getNodeIds(data).length + 1
      const newNode = {
        nodeId: newNodeId,
        label: "",
        isNew: true,
        children: [],
      }

      return updateNodes([...prevState], nodeId, (nodeIndex, nodes) =>
        nodes.splice(nodeIndex, 0, newNode)
      )
    })
  }

  const handleDuplicateClick = () => {
    setData(prevState => {
      const nodeId = selected[0]
      const newNodeId = getNodeIds(data).length + 1

      return updateNodes([...prevState], nodeId, (nodeIndex, nodes) => {
        let copy = nodes[nodeIndex]
        nodes.splice(nodeIndex + 1, 0, {
          ...copy,
          label: "Copy of " + copy.label,
          nodeId: newNodeId,
        })
        setEditableNode(newNodeId)
      })
    })
  }

  const handleEditClick = (event: any) => {
    setEditableNode(selected[0])
  }

  const handleDeleteClick = (event: any) => {
    const nodeId = selected[0]
    setData(prevState => {
      return updateNodes([...prevState], nodeId, (nodeIndex, nodes) =>
        nodes.splice(nodeIndex, 1)
      )
    })
  }

  // Tree View Handlers
  const handleAddNode = (event, nodeId, label) => {
    setData(prevState => {
      return updateNodes([...prevState], nodeId, (nodeIndex, nodes) =>
        nodes.splice(nodeIndex, 1, {
          ...nodes[nodeIndex],
          nodeId,
          ...{ label, isNew: undefined },
        })
      )
    })

    setEditableNode(null)
  }

  const handleEditNode = (event, nodeId, label) => {
    setData(prevState => {
      return updateNodes([...prevState], nodeId, (nodeIndex, nodes) =>
        nodes.splice(nodeIndex, 1, { ...nodes[nodeIndex], nodeId, label })
      )
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

  function updateNodes(nodes: Node[], nodeId, action) {
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
        <li className="list-group-item list-item-leftright-control">
          <i className="modus-icons">blank</i>
          <Form.Control
            as="input"
            autoFocus
            onKeyUp={handleOnKeyUp}
            size="lg"
            className="border-0"
            defaultValue={label}
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
                defaultValue={label}
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
              disabled={!selected.length}
            >
              <StyledIcon className="material-icons">delete</StyledIcon>
            </button>
            <button
              className="btn btn-icon-only btn-text-dark"
              disabled={!selected.length}
              onClick={handleDuplicateClick}
            >
              <StyledIcon className="material-icons">content_copy</StyledIcon>
            </button>
            <button
              className="btn btn-icon-only btn-text-dark"
              onClick={handleEditClick}
              disabled={!selected.length}
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
                  <TreeViewWithActionBar />
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
