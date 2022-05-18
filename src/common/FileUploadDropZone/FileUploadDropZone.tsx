import { forwardRef, useCallback, useState } from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import React from "react"

export interface FileUploadDropZoneProps
  extends React.HTMLProps<HTMLDivElement> {
  maxFileCount?: number
  maxTotalFileSizeBytes?: number
  multiple?: boolean
  onFiles?: (...args: any[]) => void
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

  /**
   * Fires when files are being uploaded
   */
  onFiles: PropTypes.func,
}

const UPLOAD_INITIAL = "initial"
const UPLOAD_DROP = "files drop"
const UPLOAD_SUCCESS = "upload success"
const UPLOAD_ERROR = "upload error"
const FileUploadDropZone = forwardRef<HTMLDivElement, FileUploadDropZoneProps>(
  (
    {
      maxFileCount,
      maxTotalFileSizeBytes,
      multiple,
      onFiles,
      className,
      ...props
    }: FileUploadDropZoneProps,
    ref
  ) => {
    const [state, setState] = useState<{
      status: string
      background: string
      text: string
    }>({
      status: UPLOAD_INITIAL,
      background: "bg-white",
      text: "text-secondary",
    })
    const handleDragEnter = useCallback(() => {
      console.log("drag enter")
      setState({
        status: UPLOAD_DROP,
        background: "bg-selected",
        text: "text-primary",
      })
    }, [setState])
    const handleDragLeave = useCallback(() => {
      console.log("drag leave")
      setState({
        status: UPLOAD_INITIAL,
        background: "bg-white",
        text: "text-secondary",
      })
    }, [setState])
    const handleDragOver = useCallback(e => e.preventDefault(), [])
    const handleDrop = useCallback(
      e => {
        console.log("dropped")
        e.preventDefault()
        if (onFiles) onFiles(e)
        setState({
          status: UPLOAD_INITIAL,
          background: "bg-white",
          text: "text-secondary",
        })
      },
      [onFiles, setState]
    )
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          "file-drop-zone",
          state.background,
          state.text,
          className
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {(() => {
          switch (state.status) {
            case UPLOAD_INITIAL:
              return (
                <div
                  className={classNames(
                    "d-flex flex-column my-5 text-center",
                    state.text
                  )}
                >
                  <i className="modus-icons">cloud_upload</i>
                  <p>
                    Drag files here or{" "}
                    <span className="text-primary">browse</span> to upload.
                  </p>
                </div>
              )
            case UPLOAD_DROP:
              return (
                <div
                  className={classNames(
                    "d-flex flex-column my-5 text-center",
                    state.text
                  )}
                >
                  <i className="modus-icons">cloud_upload</i>
                  <p>Drag files here.</p>
                </div>
              )
            case UPLOAD_ERROR:
              return (
                <div
                  className={classNames(
                    "d-flex flex-column my-5 text-center",
                    state.text
                  )}
                >
                  <i className="modus-icons">no_entry</i>
                  <p>Files exceed size limit.</p>
                </div>
              )

            default:
              return null
          }
        })()}
      </div>
    )
  }
)

FileUploadDropZone.displayName = "FileUploadDropZone"
FileUploadDropZone.propTypes = propTypes

export default FileUploadDropZone
