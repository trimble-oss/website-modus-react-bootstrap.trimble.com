import React from "react"
import { graphql } from "gatsby"

import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import Message from "@trimbleinc/modus-react-bootstrap/Message"
import LinkedHeading from "../../common/LinkedHeading"

import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const MessagesPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/messages/">
      Messages should be used within other elements to convey helpful
      information in an unobtrusive way.
    </Overview>

    <CodeBlock
      title="Examples"
      scope={{ Message }}
      code={`
<div>
  <Message
    icon="info"
    variant="primary"
    message="This is a primary message"
  ></Message>
  <Message
    icon="help"
    variant="secondary"
    message="This is a secondary message"
  ></Message>
</div>
`}
    >
      Use <code>&lt;Message&gt;</code> component with a <code>variant</code> to
      apply color and <code>message</code> prop for displaying text. Pass modus
      icon name to the prop <code>icon</code> to display within a message to
      further convey meaning.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="messagr-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Message} />
  </MainLayout>
)

export default MessagesPage

export const query = graphql`
  query MessageQuery {
    Message: componentMetadata(displayName: { eq: "Message" }) {
      ...ComponentApi_metadata
    }
  }
`
