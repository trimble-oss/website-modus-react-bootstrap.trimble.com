import { forwardRef } from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import { Variant } from "./types"
import React from "react"

export interface MessageProps extends React.HTMLProps<HTMLDivElement> {
  variant?: Variant
  message?: string
  icon?: React.ReactElement
  show?: boolean
}

const propTypes = {
  /**
   * The visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
   */
  variant: PropTypes.string,

  /**
   * message text
   *
   */
  label: PropTypes.string,

  /**
   * Icon Element
   *
   */
  icon: PropTypes.element,

  /**
   * Controls the visual state.
   *
   * @controllable onClose
   */
  show: PropTypes.bool,
}

const defaultProps = {
  show: true,
}
const prefix = "message"
const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    { variant, message, icon, show, className, ...props }: MessageProps,
    ref
  ) => {
    const msg = (
      <div
        {...props}
        ref={ref}
        className={classNames(
          prefix,
          variant && `${prefix}-${variant}`,
          className
        )}
      >
        {icon && <i className="modus-icons">{icon}</i>}
        {message}
        {props.children}
      </div>
    )

    return show ? msg : null
  }
)

Message.displayName = "Message"
Message.defaultProps = defaultProps as any
Message.propTypes = propTypes

export default Message
