import * as React from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import TreeViewItem from "../../common/Tree/TreeViewItem"
import TreeView from "../../common/Tree/TreeView"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import "../assets/css/test.scss"

const ContentTreePage = props => {
  return (
    <main id="main">
      <Container fluid className="pt-5">
        <Container>
          <Row>
            <div className="col-12 col-lg-6 pt-5 mt-xl-5">
              <div style={{ width: "400px" }}>
                <ModusIconsScripts />
                <TreeView multiSelectCheckBox>
                  <TreeViewItem nodeId={1} label="Layout">
                    <TreeViewItem nodeId={2} label="Main Layout">
                      <TreeViewItem nodeId={3} label="Header"></TreeViewItem>
                      <TreeViewItem nodeId={4} label="Body">
                        <TreeViewItem nodeId={5} label="Section"></TreeViewItem>
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
              </div>
            </div>
          </Row>
        </Container>
      </Container>
    </main>
  )
}

export default ContentTreePage
