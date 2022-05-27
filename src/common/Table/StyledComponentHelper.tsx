/* eslint-disable import/prefer-default-export */
import * as React from "react"

export const StyledDivWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
