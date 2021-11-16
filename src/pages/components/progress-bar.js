import { ProgressBar } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const ProgressBarPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/progress-bars/">
      Progress components are built with <code>&lt;ProgressBar&gt;</code> and
      prop <code>now</code> can be set to a value to indicate the progress so
      far. Attributes <code>role</code> and <code>aria</code> are already set to
      make it accessible.
    </Overview>

    <CodeBlock
      title="Example"
      scope={{ ProgressBar }}
      code={`
<div>
  <ProgressBar now={25} />
  <div className="text-left text-dark">
    <strong>Completed 25 of 100.</strong>
  </div>
</div>
`}
    ></CodeBlock>
    <LinkedHeading h="2" id="progess-api" className="h1">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.ProgressBar} />
  </MainLayout>
)

export default ProgressBarPage
export const query = graphql`
  query ProgressBarQuery {
    ProgressBar: componentMetadata(displayName: { eq: "ProgressBar" }) {
      ...ComponentApi_metadata
    }
  }
`
