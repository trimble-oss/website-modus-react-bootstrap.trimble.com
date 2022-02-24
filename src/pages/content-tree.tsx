import * as React from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import { ModusIconsScripts } from "../common/ExternalDependencyHelper"
import TreeViewItem from "../common/Tree/TreeViewItem"
import TreeView from "../common/Tree/TreeView"

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
