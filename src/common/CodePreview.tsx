import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import theme from "prism-react-renderer/themes/github"
import { Container } from "@trimbleinc/modus-react-bootstrap"
import React from "react"

const CodePreview = props => {
  return (
    <div className="guide-example-block">
      <LiveProvider
        noInline={props.noInline}
        code={props.code}
        scope={props.scope}
        theme={theme}
      >
        <Container
          className={`guide-example-block shadow-sm`}
          style={{ padding: "1rem", margin: "auto", ...props.style }}
        >
          <LivePreview className={props.className} />
        </Container>
        <div className="border-top border-gray-200">
          <LiveEditor />
        </div>
        <LiveError />
      </LiveProvider>
    </div>
  )
}

export default CodePreview
