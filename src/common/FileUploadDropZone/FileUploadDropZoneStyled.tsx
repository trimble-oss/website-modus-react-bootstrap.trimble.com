/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components"

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
  ${({ state }) =>
    css`
      position: relative;
      background-color: #ffffff;
      color: ${STATE_COLORS[state].text};
      .file-drop-zone-overlay {
        border: 2px dotted #a3a6b1;
        background-color: ${STATE_COLORS[state].background};
        opacity: ${state == "error" || state == "disabled" ? "50%" : "100%"};
        border-color: ${STATE_COLORS[state].text};
        z-index: 1;
        position: absolute;
      }
    `}
  ${({ state }) =>
    state === "disabled" &&
    css`
      * {
        cursor: no-drop !important;
      }
    `}

  .file-drop-zone-content {
    z-index: 2;
  }
  .browse {
    cursor: pointer;
    font-size: inherit;
  }
`

export default FileUploadDropZoneStyled
