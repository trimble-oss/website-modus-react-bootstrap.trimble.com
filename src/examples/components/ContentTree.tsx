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

  const handleExpansion = React.useCallback((nodesExpanded) => {
    setExpanded(nodesExpanded)
  }, [])
  const handleSelection = React.useCallback((nodesSelected) => {
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
