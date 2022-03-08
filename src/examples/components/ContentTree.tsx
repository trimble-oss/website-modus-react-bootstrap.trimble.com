import styled from "styled-components"

export const TreeViewBasic = `
<TreeView>
  <TreeViewItem nodeId={7} label="Inbox">
    <TreeViewItem nodeId={8} label="Personal"></TreeViewItem>
    <TreeViewItem nodeId={9} label="Work"></TreeViewItem>
    <TreeViewItem
      nodeId={10}
      label="Community"
    ></TreeViewItem>
    <TreeViewItem nodeId={11} label="Social"></TreeViewItem>
    <TreeViewItem nodeId={12} label="Friends"></TreeViewItem>
    <TreeViewItem nodeId={14} label="More ..."></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={15} label="Sent">
    <TreeViewItem nodeId={16} label="Mail1"></TreeViewItem>
    <TreeViewItem nodeId={17} label="Mail2"></TreeViewItem>
    <TreeViewItem nodeId={18} label="Mail3"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={1} label="Archived">
    <TreeViewItem nodeId={2} label="Folder1">
      <TreeViewItem nodeId={3} label="File1"></TreeViewItem>
      <TreeViewItem nodeId={4} label="Folder2">
        <TreeViewItem nodeId={5} label="File2"></TreeViewItem>
      </TreeViewItem>
      <TreeViewItem nodeId={6} label="File3"></TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={19} label="Spam"></TreeViewItem>
</TreeView>
`

export const TreeViewMultiSelect = `
<TreeView multiSelectCheckBox>
  <TreeViewItem nodeId={1} label="Layout">
    <TreeViewItem nodeId={2} label="Main Layout">
      <TreeViewItem nodeId={3} label="Header"></TreeViewItem>
      <TreeViewItem nodeId={4} label="Body">
        <TreeViewItem
          nodeId={5}
          label="Section"
        ></TreeViewItem>
      </TreeViewItem>
      <TreeViewItem nodeId={6} label="Footer"></TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={7} label="UI Elements">
    <TreeViewItem nodeId={8} label="Accordion"></TreeViewItem>
    <TreeViewItem nodeId={9} label="Alerts"></TreeViewItem>
    <TreeViewItem nodeId={10} label="Badges"></TreeViewItem>
    <TreeViewItem
      nodeId={11}
      label="Breadcrumbs"
    ></TreeViewItem>
    <TreeViewItem nodeId={12} label="Buttons"></TreeViewItem>
    <TreeViewItem nodeId={13} label="Cards"></TreeViewItem>
    <TreeViewItem nodeId={14} label="More ..."></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={15} label="Patterns">
    <TreeViewItem nodeId={16} label="Events"></TreeViewItem>
    <TreeViewItem nodeId={17} label="State"></TreeViewItem>
    <TreeViewItem nodeId={18} label="Styles"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem
    nodeId={19}
    label="Configuration"
  ></TreeViewItem>
</TreeView>
`

export const TreeViewCondensed = `
<TreeView className="list-group-condensed">
  <TreeViewItem nodeId={1} label="Layout">
    <TreeViewItem nodeId={2} label="Main Layout">
      <TreeViewItem nodeId={3} label="Header"></TreeViewItem>
      <TreeViewItem nodeId={4} label="Body">
        <TreeViewItem
          nodeId={5}
          label="Section"
        ></TreeViewItem>
      </TreeViewItem>
      <TreeViewItem nodeId={6} label="Footer"></TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={7} label="UI Elements">
    <TreeViewItem nodeId={8} label="Accordion"></TreeViewItem>
    <TreeViewItem nodeId={9} label="Alerts"></TreeViewItem>
    <TreeViewItem nodeId={10} label="Badges"></TreeViewItem>
    <TreeViewItem
      nodeId={11}
      label="Breadcrumbs"
    ></TreeViewItem>
    <TreeViewItem nodeId={12} label="Buttons"></TreeViewItem>
    <TreeViewItem nodeId={13} label="Cards"></TreeViewItem>
    <TreeViewItem nodeId={14} label="More ..."></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={15} label="Patterns">
    <TreeViewItem nodeId={16} label="Events"></TreeViewItem>
    <TreeViewItem nodeId={17} label="State"></TreeViewItem>
    <TreeViewItem nodeId={18} label="Styles"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem
    nodeId={19}
    label="Configuration"
  ></TreeViewItem>
</TreeView>
`

export const TreeViewWithItemIcon = `
function TreeViewWithIcon() {
  const [expanded, setExpanded] = React.useState([])
  const [selected, setSelected] = React.useState([])

  const handleExpansion = React.useCallback((event, nodesExpanded) => {
    setExpanded(nodesExpanded)
  }, [])
  const handleSelection = React.useCallback((event, nodesSelected) => {
    setSelected(nodesSelected)
  }, [])
  const isExpanded = nodeId => expanded.indexOf(nodeId) > -1
  const isSelected = nodeId => selected.indexOf(nodeId) > -1
  const CustomTreeViewItem = ({ nodeId, label, ...props }) => {
    return (
      <TreeViewItem
        nodeId={nodeId}
        label={label}
        itemIcon={
          <i className="material-icons">
            {isSelected(nodeId) ? "mail_outline" : "email"}
          </i>
        }
      ></TreeViewItem>
    )
  }

  return (
    <TreeView onNodeToggle={handleExpansion} onNodeSelect={handleSelection} defaultExpanded={[1]}>
      <TreeViewItem
        nodeId={1}
        label="Inbox"
        itemIcon={
          <i className="material-icons">
            {isExpanded(1) ? "folder_open" : "folder"}
          </i>
        }
      >
        <CustomTreeViewItem nodeId={4} label="Personal" />
        <CustomTreeViewItem nodeId={5} label="Work" />
        <CustomTreeViewItem nodeId={3} label="Community" />
        <CustomTreeViewItem nodeId={2} label="Social" />
        <CustomTreeViewItem nodeId={6} label="Friends" />
        <CustomTreeViewItem nodeId={8} label="More ..." />
      </TreeViewItem>
    </TreeView>
  )
}
render(<TreeViewWithIcon />);`

export const StyledIcon = styled("i")`
  line-height: 0.8 !important;
  top: 0 !important;
  position: relative !important;
  display: inline-block !important;
`
export type TreeNode = {
  nodeId: number
  label?: string
  children?: TreeNode[]
  isNew?: boolean
}
export const TreeViewWithActionBar = `
function TreeViewWithActionBar() {
  const [data, setData] = React.useState([
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
  const [editableNode, setEditableNode] = React.useState()

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

  const handleEditClick = (event) => {
    if (!selected || selected.length === 0) return
    setEditableNode(selected[0])
  }

  const handleDeleteClick = (event) => {
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

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds)
  }

  // Helpers
  function getNodeIds(array) {
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
    <div className="container w-70">
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

render(<TreeViewWithActionBar />);
`
