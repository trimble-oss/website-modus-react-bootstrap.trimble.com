import styled from 'styled-components';

const TreeViewStyled = styled.ul`
  .modus-icons,
  .material-icons {
    cursor: pointer;
    font-size: 16px !important;
  }
  &.list-group-condensed {
    .modus-icons,
    .material-icons {
      font-size: 12px !important;
    }
    .custom-control {
      height: 1.5rem;
    }
    .custom-control .custom-checkbox {
      padding-left: 1.375rem;
    }
    .custom-control .custom-control-label {
      font-size: 0.75rem;
      line-height: 2.1;
    }
    .custom-checkbox.custom-control .custom-control-label::before,
    .custom-checkbox.custom-control .custom-control-label::after {
      top: 0.3125rem;
      left: -1.3125rem;
      width: 0.875rem;
      height: 0.875rem;
    }
  }
`;
export const TreeViewItemStyled = styled.li<{
  level: number;
  checkBoxSelection: string;
  itemIcon: string;
}>`
  &:focus-visible,
  &.focus-visible,
  *:focus-visible {
    outline: 2px auto #0063a3 !important;
  }
  .custom-control-input:focus-visible {
    & ~ .custom-control-label::before,
    & ~ .custom-control-label::after {
      outline: 2px auto #0063a3 !important;
    }
  }

  &.list-group-item {
    padding: 5px 16px 5px 0 !important;
    cursor: pointer;
    align-items: stretch !important;

    grid-template-columns: min-content ${(props) =>
        props.checkBoxSelection === 'true' && 'min-content'} ${(props) =>
        props.itemIcon === 'true' && 'min-content'} auto min-content !important;

    .tree-item-level {
      padding-left: ${(props) =>
        props.level > 0 ? (props.level - 1) * 0.5 : 0}rem !important;
    }
  }
`;
export const TreeViewItemGroupStyled = styled.ul<{ expanded: string }>`
  display: ${(props) => (props.expanded === 'true' ? 'block' : 'none')};
`;

export default TreeViewStyled;