import styled, { css } from "styled-components"
import { StyledDivWrapper } from "./StyledComponentHelper"

const DataTableStyled = styled(StyledDivWrapper)`
  .container {
    :first-child {
      padding: 0;
      width: 100%;
    }
  }
  .scrollable.container {
    :first-child {
      overflow-y: auto;
    }
  }

  .table {
    :first-child {
      margin: 0;
      width: 100%;
      height: 100%;

      th,
      td {
        align-items: center;
        display: flex;
      }

      th .modus-icons.material-icons.sorted,
      th .modus-icons.material-icons.unsorted {
        vertical-align: text-bottom;
        font-size: 1rem;
        cursor: pointer !important;
      }

      thead.sticky-top tr,
      thead.sticky-top th {
        box-shadow: 0 2px 0 0 #b7b9c3, 0 -1px 0 0 #b7b9c3;
        border-bottom: 0 !important;
        border-top: 0 !important;
      }

      th .modus-icons.material-icons.unsorted {
        opacity: 0.5;
      }

      th .modus-icons.material-icons.unsorted:hover {
        opacity: 1;
      }

      th .table-col-resizable {
        bottom: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 5px;
      }

      th .table-col-resizable:hover {
        background-color: #9bc2f7;
        cursor: ew-resize !important;
      }

      .hidden-column {
        position: relative;
        width: 0;

        div:first-child {
          position: absolute;
          height: 100%;
          z-index: 9999;
          cursor: pointer;
          background-color: #b7b9c3;
          width: 3px;

          .modus-icons {
            width: 0.5rem;
            font-size: 1rem;
          }

          .modus-icons.triangle_left {
            left: calc(-0.5rem + 1px);
          }
          .modus-icons.triangle_right {
            left: calc(-0.5rem + 5px);
          }
        }
      }

      tr.selected {
        background-color: #dcedf9;
      }

      th {
        &.drop-allow {
          border-left: 2px solid #0063a3 !important;
        }
        &.drop-block {
          border-left: 2px solid red !important;
        }
        &.draggable {
          padding-left: 0;
          .th-content {
            cursor: -webkit-grab !important;
            padding-left: 1rem;
          }
        }
      }

      &.table-bordered {
        border-left: 0;

        th:first-child,
        td:first-child {
          box-shadow: inset 1px 0 0 0 #b7b9c3;
          border-left: 0;
        }

        thead.sticky-top th:first-child {
          box-shadow: 0 2px 0 0 #b7b9c3, 0 -1px 0 0 #b7b9c3,
            inset 1px 0 0 0 #b7b9c3;
          border-bottom: 0 !important;
          border-top: 0 !important;
        }

        th,
        td {
          border: 0;
          border-bottom: 1px solid #b7b9c3;
          border-right: 1px solid #b7b9c3;
        }
      }
    }
  }
`
export default DataTableStyled