import React from "react"
import { useState } from "react"
import { Button, Modal } from "@trimbleinc/modus-react-bootstrap"

import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import LinkedHeading from "../../common/LinkedHeading"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"

const ModalsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/modals/">
      <p>
        Modals are positioned over everything else in the document and remove
        scroll from the <code>&lt;body&gt;</code> so that modal content scrolls
        instead. Modals are <em>unmounted</em> when closed.
      </p>
      <p>
        Bootstrap only supports <strong>one</strong> modal window at a time.
        Nested modals aren’t supported, but if you really need them the
        underlying <code>react-overlays</code> can support them if you're
        willing.
      </p>
      <p>
        Modal's "trap" focus in them, ensuring the keyboard navigation cycles
        through the modal, and not the rest of the page. Unlike vanilla
        Bootstrap, <code>autoFocus</code> works in Modals because React handles
        the implementation.
      </p>
    </Overview>

    <CodeBlock
      title="Basic Modal"
      scope={{ Modal, Button }}
      code={`
<Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Modal body text goes here.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary">Close</Button>
    <Button variant="primary">Save changes</Button>
  </Modal.Footer>
</Modal.Dialog>
`}
    >
      A modal with header, body, and set of actions in the footer. Use{" "}
      <code>&lt;Modal/&gt;</code> in combination with other components to show
      or hide your Modal. The <code>&lt;Modal/&gt;</code> Component comes with a
      few convenient "sub components": <code>&lt;Modal.Header/&gt;</code>,{" "}
      <code>&lt;Modal.Title/&gt;</code>, <code>&lt;Modal.Body/&gt;</code>, and{" "}
      <code>&lt;Modal.Footer/&gt;</code>, which you can use to build the Modal
      content.
    </CodeBlock>

    <CodeBlock
      title="Live Example"
      scope={{ useState, Button, Modal }}
      noInline={true}
      code={`function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>This text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

render(<Example />);`}
    >
      Use <code>show</code> prop on <code>&lt;Modal&gt;</code> to control its
      visibility and <code>useState</code> to set the visibility state on click
      of <code>&lt;Button&gt;</code>. You can vertically center a modal by
      passing the "centered" prop.
    </CodeBlock>

    <CodeBlock
      title="Optional Sizes"
      scope={{ Button, useState, Modal }}
      noInline={true}
      code={`function Example() {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [xlShow, setXlShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)}>Small modal</Button>{' '}
      <Button onClick={() => setLgShow(true)}>Large modal</Button>{' '}
      <Button onClick={() => setXlShow(true)}>Extra Large modal</Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Modal
        size="xl"
        show={xlShow}
        onHide={() => setXlShow(false)}
        aria-labelledby="example-modal-sizes-title-xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-xl">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  );
}

render(<Example />);`}
    >
      You can specify a bootstrap large or small modal by using the "size"
      prop.These sizes kick in at certain breakpoints to avoid horizontal
      scrollbars on narrower viewports.
      <table className="table bg-striped bg-white border">
        <thead>
          <tr>
            <th>Size</th>
            <th>Class</th>
            <th>Modal max-width</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Small</td>
            <td>
              <code>.modal-sm</code>
            </td>
            <td>
              <code>300px</code>
            </td>
          </tr>
          <tr>
            <td>Default</td>
            <td className="text-muted">None</td>
            <td>
              <code>500px</code>
            </td>
          </tr>
          <tr>
            <td>Large</td>
            <td>
              <code>.modal-lg</code>
            </td>
            <td>
              <code>800px</code>
            </td>
          </tr>
          <tr>
            <td>Extra large</td>
            <td>
              <code>.modal-xl</code>
            </td>
            <td>
              <code>1140px</code>
            </td>
          </tr>
        </tbody>
      </table>
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="modals-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Modal} />
    <ComponentApi metadata={props.data.ModalDialog} />
    <ComponentApi metadata={props.data.ModalHeader} />
    <ComponentApi metadata={props.data.ModalTitle} />
    <ComponentApi metadata={props.data.ModalBody} />
    <ComponentApi metadata={props.data.ModalFooter} />
  </MainLayout>
)

export default ModalsPage

export const query = graphql`
  query ModalQuery {
    Modal: componentMetadata(displayName: { eq: "Modal" }) {
      ...ComponentApi_metadata
    }
    ModalDialog: componentMetadata(displayName: { eq: "ModalDialog" }) {
      ...ComponentApi_metadata
    }
    ModalHeader: componentMetadata(displayName: { eq: "ModalHeader" }) {
      ...ComponentApi_metadata
    }
    ModalTitle: componentMetadata(displayName: { eq: "ModalTitle" }) {
      ...ComponentApi_metadata
    }
    ModalBody: componentMetadata(displayName: { eq: "ModalBody" }) {
      ...ComponentApi_metadata
    }
    ModalFooter: componentMetadata(displayName: { eq: "ModalFooter" }) {
      ...ComponentApi_metadata
    }
  }
`
