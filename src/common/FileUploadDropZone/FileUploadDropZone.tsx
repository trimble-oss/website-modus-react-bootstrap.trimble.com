import { forwardRef } from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import React from "react"

export interface FileUploadDropZoneProps
  extends React.HTMLProps<HTMLDivElement> {
  maxFileCount?: number
  maxTotalFileSizeBytes?: number
  multiple?: boolean
}

const propTypes = {
  /**
   * Maximum number of files can be uploaded
   *
   */
  maxFileCount: PropTypes.number,

  /**
   * Maximum Total size of the files uploaded
   *
   */
  maxTotalFileSizeBytes: PropTypes.number,

  /**
   * Allows upload of multiple files
   *
   */
  multiple: PropTypes.bool,
}

const FileUploadDropZone = forwardRef<HTMLDivElement, FileUploadDropZoneProps>(
  (
    {
      maxFileCount,
      maxTotalFileSizeBytes,
      multiple,
      className,
      ...props
    }: FileUploadDropZoneProps,
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames("file-drop-zone", className)}
      >
        <div className="d-flex flex-column my-5 text-center text-primary">
          <i className="modus-icons">cloud_upload</i>
          Drag and Drop CSV here
        </div>
      </div>
    )
  }
)

FileUploadDropZone.displayName = "FileUploadDropZone"
FileUploadDropZone.propTypes = propTypes

export default FileUploadDropZone
