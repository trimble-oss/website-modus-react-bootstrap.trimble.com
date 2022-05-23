/* eslint-disable import/prefer-default-export */
import * as React from "react"
import styled from "styled-components"

const STATE_COLORS = {
  default: {
    text: "#6a6e79",
  },
  drop: {
    text: "#0063a3",
    background: "#dcedf9",
  },
  error: {
    text: "#ab1f26",
    background: "#fbd4d7",
  },
  disabled: {
    text: "#6a6e79",
    background: "#cbcdd6",
  },
}
const FileUploadDropZoneStyled = styled.div<{ state?: string }>`
  &.file-drop-zone {
    position: relative;
    background-color: #ffffff;
    color: ${({ state }) => STATE_COLORS[state].text};
    border-color: ${({ state }) => STATE_COLORS[state].text};
    .file-drop-zone-overlay {
      background-color: ${({ state }) => STATE_COLORS[state].background};
      z-index: 1;
      position: absolute;
    }
    .file-drop-zone-content {
      z-index: 2;
    }
    .browse {
      cursor: pointer;
      font-size: inherit;
    }
    &.disabled {
      * {
        cursor: no-drop !important;
      }
    }
  }
`

export default FileUploadDropZoneStyled
