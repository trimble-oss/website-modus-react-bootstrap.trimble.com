import * as React from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import { ModusIconsScripts } from "../common/ExternalDependencyHelper"
import TreeViewItem from "../common/Tree/TreeViewItem"
import TreeView from "../common/Tree/TreeView"

function TreeViewWithIcon() {
  const [expanded, setExpanded] = React.useState([])
  const [selected, setSelected] = React.useState([])

  const handleExpansion = React.useCallback(nodesExpanded => {
    setExpanded(nodesExpanded)
  }, [])
  const handleSelection = React.useCallback(nodesSelected => {
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
    <TreeView
      onNodeToggle={handleExpansion}
      onNodeSelect={handleSelection}
      defaultExpanded={[1]}
      checkBoxSelection
      multiSelectCheckBox
    >
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
