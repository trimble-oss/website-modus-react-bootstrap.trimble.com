import { forwardRef, useCallback, useRef, useState } from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import React from "react"

export interface FileUploadDropZoneProps
  extends React.HTMLProps<HTMLDivElement> {
  maxFileCount?: number
  maxTotalFileSizeBytes?: number
  multiple?: boolean
  onFiles?: (files: FileList, err: string) => void
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
    const resolvedRef = (useRef<HTMLDivElement>(null) ||
      ref) as React.MutableRefObject<HTMLDivElement>
    const dragCounter = useRef(0) // workaround for drag leave event firing on parent when dragging over child div
    const [state, setState] = useState<{
      css?: string
      icon?: React.ReactElement
      message?: React.ReactElement | string
    }>(null)

    const handleDragEnter = useCallback(
      e => {
        e.preventDefault()
        e.stopPropagation()

        setState({
          css: "files-dropping",
          message: "Drag files here.",
        })

        dragCounter.current++
      },
      [setState]
    )
    const handleDragLeave = useCallback(
      e => {
        e.preventDefault()
        e.stopPropagation()

        dragCounter.current--
        if (dragCounter.current === 0) {
          setState(null)
        }
      },
      [setState]
    )
    const handleDragOver = useCallback(e => {
      e.preventDefault()
      e.stopPropagation()
    }, [])
    const handleDrop = useCallback(
      e => {
        e.preventDefault()
        e.stopPropagation()

        let err = ValidateFiles(e.dataTransfer.files)
        if (err) {
          setState({
            css: "files-invalid",
            icon: <i className="modus-icons">no_entry</i>,
            message: err,
          })
        } else setState(null)

        if (onFiles) onFiles(e.dataTransfer.files, err)
      },
      [onFiles, setState]
    )

    const ValidateFiles = useCallback(
      (files: FileList) => {
        if (files) {
          let arr = Array.from(files)
          // Total size
          if (maxTotalFileSizeBytes) {
            let totalSize = arr.reduce((tot, file) => {
              return tot + file.size
            }, 0)
            if (totalSize > maxTotalFileSizeBytes)
              return `Upload size exceeds limit. Max upload size ${maxTotalFileSizeBytes}bytes.`
          }
          // Multiple files upload
          if (!multiple && arr.length > 1) {
            return `Multiple files cannot be uploaded.`
          }
          if (multiple && maxFileCount && arr.length > maxFileCount) {
            return `Max files can be uploaded exceeds limit. Number of files uploaded is ${arr.length} and the limit is ${maxFileCount}.`
          }
        }
        return null
      },
      [maxFileCount, maxTotalFileSizeBytes, multiple]
    )

    return (
      <div
        {...props}
        ref={resolvedRef}
        className={classNames("file-drop-zone", state && state.css, className)}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={classNames("d-flex flex-column my-5 text-center")}>
          {(state && state.icon) || <i className="modus-icons">cloud_upload</i>}
          <p>
            {(state && state.message) || (
              <>
                Drag files here or
                <span className="text-primary">browse</span> to upload.
              </>
            )}
          </p>
        </div>
      </div>
    )
  }
)

FileUploadDropZone.displayName = "FileUploadDropZone"
FileUploadDropZone.propTypes = propTypes

export default FileUploadDropZone
