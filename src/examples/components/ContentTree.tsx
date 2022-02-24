export const Basic = `
<TreeView>
  <TreeViewItem nodeId={1} label="Node1">
    <TreeViewItem nodeId={2} label="Node2"></TreeViewItem>
    <TreeViewItem nodeId={3} label="Node3"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={4} label="Node4">
    <TreeViewItem nodeId={5} label="Node5">
      <TreeViewItem nodeId={6} label="Node6"></TreeViewItem>
      <TreeViewItem nodeId={7} label="Node7">
        <TreeViewItem nodeId={8} label="Node8"></TreeViewItem>
      </TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={9} label="Node9"></TreeViewItem>
  <TreeViewItem nodeId={10} label="Node10"></TreeViewItem>
</TreeView>
`

export const MultiSelect = `
<TreeView multiSelect>
  <TreeViewItem nodeId={1} label="Node1">
    <TreeViewItem nodeId={2} label="Node2"></TreeViewItem>
    <TreeViewItem nodeId={3} label="Node3"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={4} label="Node4">
    <TreeViewItem nodeId={5} label="Node5">
      <TreeViewItem nodeId={6} label="Node6"></TreeViewItem>
      <TreeViewItem nodeId={7} label="Node7">
        <TreeViewItem nodeId={8} label="Node8"></TreeViewItem>
      </TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={9} label="Node9"></TreeViewItem>
  <TreeViewItem nodeId={10} label="Node10"></TreeViewItem>
</TreeView>
`

export const Condensed = `
<TreeView className="list-group-condensed">
  <TreeViewItem nodeId={1} label="Node1">
    <TreeViewItem nodeId={2} label="Node2"></TreeViewItem>
    <TreeViewItem nodeId={3} label="Node3"></TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={4} label="Node4">
    <TreeViewItem nodeId={5} label="Node5">
      <TreeViewItem nodeId={6} label="Node6"></TreeViewItem>
      <TreeViewItem nodeId={7} label="Node7">
        <TreeViewItem nodeId={8} label="Node8"></TreeViewItem>
      </TreeViewItem>
    </TreeViewItem>
  </TreeViewItem>
  <TreeViewItem nodeId={9} label="Node9"></TreeViewItem>
  <TreeViewItem nodeId={10} label="Node10"></TreeViewItem>
</TreeView>
`
