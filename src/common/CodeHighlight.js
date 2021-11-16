import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/github"
import styled from "styled-components"

const StyledPre = styled.pre`
  text-align: left;
  padding: 0.5em;
  overflow: auto;
  height: 100%;
  margin-bottom: 0 !important;
  font-size: inherit !important;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

const CodeHighlight = ({
  code,
  className = "",
  language = "jsx",
  ...props
}) => {
  if (!code) return null
  let codeText = code.trim().replace(";<", "<").replace(/>;$/, ">")

  return (
    <div className={className} {...props}>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={codeText}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <StyledPre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </StyledPre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeHighlight
