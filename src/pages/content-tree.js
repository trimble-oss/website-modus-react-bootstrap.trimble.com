import * as React from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import Tree from "../common/Tree/Tree"
import { ModusIconsScripts } from "../common/ExternalDependencyHelper"

const ContentTreePage = props => {
  return (
    <DefaultLayout location={props.location}>
      <main id="main">
        <Container fluid className="pt-5">
          <Container>
            <Row>
              <div className="col-12 col-lg-6 pt-5 mt-xl-5">
                <h1 className="text-trimble-blue mt-4 display-4 font-weight-bold text-center text-lg-left">
                  <ModusIconsScripts />
                  <Tree />
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
