import { Toast } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const ToastsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/toasts/">
      Toasts are available for any length of text, as well as an optional
      dismiss button. For proper styling, use one of the eight required
      contextual classes (e.g., .<code>toast-success</code>). For inline
      dismissal, use the prop <code>show</code> to set the visibility of the
      toast.
    </Overview>

    <CodeBlock
      title="Toasts"
      scope={{ Toast }}
      code={`
<div>
  <Toast>
    Aww yeah, you read a toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-dark">
    Aww yeah, you read a dark toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-primary">
    Aww yeah, you read a primary toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-secondary">
    Aww yeah, you read a secondary toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-tertiary">
    Aww yeah, you read a tertiary toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-danger">
    Aww yeah, you read a danger toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-warning">
    Aww yeah, you read a warning toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
  <Toast className="toast-success">
    Aww yeah, you read a success toast.
    <button type="button" className="close" data-dismiss="toast">
      <i className="modus-icon material-icons">close</i>
    </button>
  </Toast>
</div>
`}
    ></CodeBlock>

    <LinkedHeading h="2" id="toasts-api" className="h1">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Toast} />
    <ComponentApi metadata={props.data.ToastHeader} />
    <ComponentApi metadata={props.data.ToastBody} />
  </MainLayout>
)

export default ToastsPage
export const query = graphql`
  query ToastQuery {
    Toast: componentMetadata(displayName: { eq: "Toast" }) {
      ...ComponentApi_metadata
    }
    ToastHeader: componentMetadata(displayName: { eq: "ToastHeader" }) {
      ...ComponentApi_metadata
    }
    ToastBody: componentMetadata(displayName: { eq: "ToastBody" }) {
      ...ComponentApi_metadata
    }
  }
`
