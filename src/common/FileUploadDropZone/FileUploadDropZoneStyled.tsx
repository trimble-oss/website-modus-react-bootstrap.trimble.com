/* eslint-disable import/prefer-default-export */
import * as React from "react"
import { HTMLAttributes } from "react"
import styled, { css } from "styled-components"

export const StyledDivWrapper = React.forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})

const FileUploadDropZoneStyled = styled(StyledDivWrapper)`
  color: #6a6e79;
  &.files-invalid {
    color: #da212c;
    background-color: #fbd4d7;
  }
  &.files-dropping {
    color: #0063a3;
    background-color: #dcedf9;
  }
  .browse {
    cursor: pointer;
    font-size: inherit;
  }
  &.disabled {
    background-color: #cbcdd6 !important;
    * {
      color: #6a6e79 !important;
      cursor: no-drop !important;
    }
  }
`

export default FileUploadDropZoneStyled
