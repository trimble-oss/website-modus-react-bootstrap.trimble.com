import React from "react"
import CodeHighlight from "../../common/CodeHighlight"
import MainLayout from "../../layouts/MainLayout"

const DeviceSupportPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <p>
        You can use any of the components as demonstrated in the documentation.
        Please refer to each component's{" "}
        <a href="/components/cards/">demo page</a> to see how they should be
        imported.
      </p>
      <h2 id="quick-start" className="h1 font-weight-bold mt-5">
        Quick Start
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#quick-start"
          aria-label="anchor"
        ></a>
      </h2>
      <p>Here's a quick example to get you started</p>
      <CodeHighlight
        code={`
  //index.js
  import React from "react"; //React Core dependency
  import ReactDOM from "react-dom"; //React Core dependency
  import "@trimbleinc/modus-bootstrap/dist/modus.min.css"; //Modus CSS dependency
  import App from "./app"; //Page and components
  ...

  //app.js
  import React from "react";
  import { Button, DropdownButton, Dropdown, Card } from "@trimbleinc/modus-react-bootstrap";

  export default function App() {
    return (
      <Card style={{ width: "18rem" }} border="dark" className="shadow">
        <Card.Body>
          <Card.Title as="h4">Card title</Card.Title>
          <Card.Title as="h5">Card subtitle</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="secondary" size="sm"  className="m-2">
            Regular Button
          </Button>
          <Button variant="tertiary" href="#" className="m-2">
            Link Button
          </Button>
          <DropdownButton
            variant="primary"
            id="dropdown-basic-button"
            title="Anchor Tag"
            href="#"
            className="m-2"
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <br />
        </Card.Body>
      </Card>
    );
  }

`}
      />

      <h3 id="demo" className="font-weight-bold mt-3">
        Demo
      </h3>
      <div style={{ position: "relative", display: "flex" }}>
        {" "}
        <iframe
          src="https://codesandbox.io/embed/confident-benz-2dwlu?fontsize=14&hidenavigation=1&theme=dark"
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          title="confident-benz-2dwlu"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </article>
  </MainLayout>
)

export default DeviceSupportPage
