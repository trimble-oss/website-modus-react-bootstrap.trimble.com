import * as React from 'react';
import PropTypes from 'prop-types';
import { CustomPropsWithDisplayName } from './helpers';

export type TableBodyProps = CustomPropsWithDisplayName;

const propTypes = {
  /**
   * CSS class name
   */
  className: PropTypes.string,
};

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody className={className} {...props} ref={ref}>
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';
TableBody.propTypes = propTypes;

export default TableBody;
