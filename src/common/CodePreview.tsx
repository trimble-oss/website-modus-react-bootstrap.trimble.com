import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react"
import ReactDOM from "react-dom"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import theme from "prism-react-renderer/themes/github"
import { Container } from "@trimbleinc/modus-react-bootstrap"
import * as ReactBootstrap from "@trimbleinc/modus-react-bootstrap"
import { FileUploadDropZone } from "./FileUploadDropZone"
import { Table, TablePagination, DataTable } from "../common/Table"
import { TreeView, TreeViewItem } from "../common/Tree"
import styled from "styled-components"

const StyledAccordion = styled(ReactBootstrap.Accordion)`
  .card-header::after {
    display: none !important;
  }
`

const CodePreview = props => {
  const scope = {
    ReactDOM,
    useEffect,
    useRef,
    useState,
    useContext,
    useCallback,
    useMemo,
    DataTable,
    FileUploadDropZone,
    Table,
    TablePagination,
    TreeView,
    TreeViewItem,
  }

  const [toggle, setToggle] = useState(props.hideCode)
  const toggleCode = () => {
    setToggle(prevState => !prevState)
  }

  return (
    <div className="guide-example-block">
      <LiveProvider
        noInline={props.noInline}
        code={props.code}
        scope={scope}
        theme={theme}
      >
        <Container
          className={`guide-example-block shadow-sm`}
          style={{ padding: "1rem", margin: "auto", ...props.style }}
        >
          <LivePreview className={props.className} />
        </Container>
        <StyledAccordion
          className="guide-code-options bg-light d-sm-flex align-items-center border-top border-gray-200"
          defaultActiveKey={toggle ? null : "0"}
        >
          <ReactBootstrap.Card className="w-100">
            <ReactBootstrap.Card.Header className="w-100 m-0 p-0">
              <div className="d-flex justify-content-end w-100">
                <div>
                  <ReactBootstrap.Accordion.Toggle
                    onClick={toggleCode}
                    as={ReactBootstrap.Nav.Link}
                    variant="link"
                    eventKey="0"
                  >
                    {toggle ? "Show Code" : "Hide Code"}
                  </ReactBootstrap.Accordion.Toggle>
                </div>
              </div>
            </ReactBootstrap.Card.Header>
            <ReactBootstrap.Accordion.Collapse eventKey="0">
              <ReactBootstrap.Card.Body className="p-0">
                <LiveEditor style={{ backgroundColor: "#fafafa" }} />
              </ReactBootstrap.Card.Body>
            </ReactBootstrap.Accordion.Collapse>
          </ReactBootstrap.Card>
        </StyledAccordion>
        <LiveError />
      </LiveProvider>
    </div>
  )
}

export default CodePreview
