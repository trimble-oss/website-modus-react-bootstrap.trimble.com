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
import { useEffect } from "react"
import useForceUpdate from "@restart/hooks/useForceUpdate"

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

  // Action Bar Handlers
  const handleExpandAllClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? getNodeIds(data) : []
    )
  }

  function flattenData(array, parentId) {
    if (!array) return []
    return array.reduce((r, { nodeId, label, children }) => {
      r[nodeId] = { nodeId, label, parentId }
      r = { ...r, ...flattenData(children, nodeId) }
      return r
    }, [])
  }

  function filterData(nodes, searchResult, searchText, skip) {
    if (!nodes || !searchResult || searchResult.length === 0 || !searchText)
      return []
    let removeNodes = []
    nodes.forEach((node, i) => {
      if (searchResult.indexOf(node.nodeId) > -1) {
        let skipNode = false
        if (node.label.toLowerCase().indexOf(searchText) > -1) {
          node.label = <div style={{ color: "#0063a3" }}>{node.label}</div>
          skipNode = true
        }
        node.children = filterData(
          node.children,
          searchResult,
          searchText,
          skipNode
        )
      } else {
        if (!skip) removeNodes.push(node.nodeId)
      }
    })
    return nodes.filter(node => !removeNodes.includes(node.nodeId))
  }

  const handleFilter = event => {
    setExpanded(getNodeIds(initialData))

    if (!event.target.value) {
      setData(initialData)
      return
    }
    const searchText = event.target.value.toLowerCase()
    const flatData = flattenData(initialData, null)
    const searchResult = Object.keys(flatData)
      .filter(key => {
        return flatData[key].label.toLowerCase().indexOf(searchText) > -1
      })
      .map(i => Number(i))

    let ancestors = []
    searchResult.forEach(i => {
      let { parentId } = flatData[i]
      while (parentId != null) {
        ancestors.push(parentId)
        parentId = flatData[parentId].parentId
      }
    })
    debugger
    setData(
      filterData([...initialData], [...searchResult, ...ancestors], searchText)
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
      <>
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
      </>
    )
  }

  return (
    <div style={{ width: "400px" }}>
      <div className="container">
        <div className="row row-cols-1">
          <div className="col">
            <div>
              <div className="input-with-icon-left">
                <FormControl
                  as="input"
                  placeholder="Search"
                  onChange={handleFilter}
                ></FormControl>
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
