import styled, { css } from "styled-components"

export const StyledDataTable = styled.div`
  .table {
    :first-child {
      margin: 0;
      width: 100%;
      height: 100%;

      th .modus-icons.material-icons.sorted,
      th .modus-icons.material-icons.unsorted {
        vertical-align: text-bottom;
        font-size: 1rem;
      }

      thead.sticky-top tr {
        box-shadow: 0 1px 0 0 #b7b9c3, 0 -1px 0 0 #b7b9c3;
        border-bottom-width: 0;
        border-top-width: 0;
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
        cursor: ew-resize;
      }
    }
  }

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

  ${props =>
    props.resizeColumns &&
    css`
      table {
        :first-child {
          th,
          td {
            align-items: center;
            display: flex;
          }
        }
      }

      table.table-bordered {
        :first-child {
          th,
          td {
            border: 0;
            border-bottom: 1px solid #b7b9c3;
            border-right: 1px solid #b7b9c3;
          }
        }
      }
    `}
`
