import styled, { css } from "styled-components"
import { StyledDivWrapper } from "./StyledComponentHelper"

const ContextMenuStyled = styled(StyledDivWrapper)`
  position: absolute;
  z-index: 9999;
  min-width: 150px;
  cursor: pointer;

  .list-group-item + .dropdown-menu {
    padding: 0;
  }

  span,
  div,
  label,
  li {
    font-size: 0.875rem;
  }
`
export default ContextMenuStyled
