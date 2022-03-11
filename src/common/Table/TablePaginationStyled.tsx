import styled, { css } from "styled-components"
import { StyledDivWrapper } from "./StyleHelpers"

const TablePaginationStyled = styled(StyledDivWrapper)`
  div.container {
    :first-child {
      margin-bottom: 1rem;
      padding: 0.5rem;

      li.page-item.p-0 > .page-link {
        padding: 0;
      }

      li.page-item.p-0 .nav-link {
        padding: calc((2rem - 0.875rem) / 2) 0.75rem;
      }

      li.page-item.p-0 .nav-item .dropdown-item {
        font-size: 0.875rem;
      }
    }
  }
`
export default TablePaginationStyled
