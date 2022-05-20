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
  color: #6a6e79 !important;
  .dropzone-content {
    color: #6a6e79 !important;
  }
  &.files-invalid {
    color: #da212c !important;
    background-color: #fbd4d7;
    .dropzone-content {
      color: #da212c !important;
    }
  }
  &.files-dropping {
    color: #0063a3 !important;
    background-color: #dcedf9;
    .dropzone-content {
      color: #0063a3 !important;
    }
  }
  .browse {
    cursor: pointer;
  }
  &.disabled {
    background-color: #cbcdd6 !important;
    color: #6a6e79 !important;
    * {
      cursor: no-drop !important;
    }
  }
`

export default FileUploadDropZoneStyled
