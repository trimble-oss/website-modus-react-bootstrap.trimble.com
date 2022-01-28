import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  useResizeColumns,
  useFlexLayout,
  TableOptions,
  UseSortByColumnOptions,
  UseResizeColumnsColumnOptions,
  TableState,
} from 'react-table';
import { TableContext } from './TableContext';
import { StyledDataTable } from './styleHelpers';

export type TableColumn = Column<any> &
  UseResizeColumnsColumnOptions<any> &
  UseSortByColumnOptions<any> & {
    sortBy?: boolean;
  };

export interface DataTableProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'data'>,
    Omit<TableOptions<any>, 'columns'> {
  columns: ReadonlyArray<TableColumn>;
  hasSorting?: boolean;
  hasPagination?: boolean;
  resizeColumns?: boolean;
  children?: (...props: any) => React.ReactNode;
}

const propTypes = {
  /**
   * Array of header data of type TableColumn.
   */
  columns: PropTypes.array.isRequired,
  /**
   * Array of data to be displayed as Table Rows.
   */
  data: PropTypes.array.isRequired,

  /**
   * Enables sorting on Table rows.
   */
  hasSorting: PropTypes.bool,

  /**
   * Enables pagination on Table rows.
   */
  hasPagination: PropTypes.bool,

  /**
   * Enables Table header resizing.
   */
  resizeColumns: PropTypes.bool,

  /**
   * Enables row selection on Table rows.
   */
  hasRowSelection: PropTypes.bool,

  /**
   * Enables row selection on Table rows using checkbox.
   */
  hasCheckBoxRowSelection: PropTypes.bool,
};

export function DataTable(
  props: React.PropsWithChildren<DataTableProps> & {
    ref?: React.Ref<HTMLDivElement>;
  },
): React.ReactElement {
  // useSortBy hook enables sorting for all the columns by default
  // and disableSortBy is the only control available at column configuration level

  const {
    columns,
    data,
    hasSorting,
    hasPagination,
    resizeColumns,
    children,
    ref,
    ...rest
  } = props;
  const normalizedColumns = React.useMemo(
    () =>
      columns.map((col) => {
        const { sortBy, ...columnProps } = col;
        columnProps.disableSortBy = !sortBy;

        return columnProps;
      }),
    [],
  );

  const hooks: any = [];
  if (hasSorting) hooks.push(useSortBy);
  if (hasPagination) hooks.push(usePagination);
  if (resizeColumns) hooks.push(useFlexLayout, useResizeColumns);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: normalizedColumns,
      data,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      initialState: { pageIndex: 0, pageSize: 10 } as TableState,
      // defaultColumn,
    },
    ...hooks,
  );

  // TODO:
  // Params passed in the children are constructed dynamically decided by the hooks passed to useTable
  // Find a way to create type definition
  return (
    <TableContext.Provider
      value={{
        getTableProps,
        headerGroups,
      }}
    >
      <StyledDataTable resizecolumns={(resizeColumns && 'true') || 'false'}>
        <div {...rest} ref={ref}>
          {children &&
            children({
              rows: hasPagination ? page : rows,
              prepareRow,
              gotoPage,
              pageIndex,
              pageOptions,
              pageSize,
              setPageSize,
            })}
        </div>
      </StyledDataTable>
    </TableContext.Provider>
  );
}

DataTable.propTypes = propTypes;

export default DataTable;
