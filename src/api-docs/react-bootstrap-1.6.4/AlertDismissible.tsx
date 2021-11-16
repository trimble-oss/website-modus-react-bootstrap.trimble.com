import React from "react"
import { forwardRef, useState } from "react"
import { AlertProps, Alert } from "@trimbleinc/modus-react-bootstrap"
import PropTypes from "prop-types"
import { elementType } from "prop-types-extra"
import useEventCallback from "@restart/hooks/useEventCallback"

export interface AlertDismissibleProps
  extends Omit<AlertProps, "dismissible"> {}

const propTypes = {
  /**
   * @default 'alert'
   */
  bsPrefix: PropTypes.string,

  /**
   * The Alert visual variant
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'}
   */
  variant: PropTypes.string,

  /**
   * Controls the visual state of the Alert.
   *
   * @controllable onClose
   */
  show: PropTypes.bool,

  /**
   * Callback fired when alert is closed.
   *
   * @controllable show
   */
  onClose: PropTypes.func,

  /**
   * Sets the text for alert close button.
   */
  closeLabel: PropTypes.string,

  /**
   * Animate the alert dismissal. Defaults to using `<Fade>` animation or use
   * `false` to disable. A custom `react-transition-group` Transition can also
   * be provided.
   */
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
}

const AlertDismissible = forwardRef<HTMLDivElement, AlertDismissibleProps>(
  ({ onClose: onCloseDismiss, ...props }: AlertDismissibleProps, ref) => {
    const [show, setShow] = useState(true)

    const handleClose = useEventCallback((a, b) => {
      setShow(false)
      if (onCloseDismiss) {
        onCloseDismiss(a, b)
      }
    })

    const alert = (
      <Alert {...props} onClose={handleClose} dismissible>
        {props.children}
      </Alert>
    )

    return show ? alert : null
  }
)

AlertDismissible.propTypes = propTypes
AlertDismissible.displayName = "AlertDismissible"

export default AlertDismissible
