import {
  DragEventHandler,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import React from "react"
import FileUploadDropZoneStyled from "./FileUploadDropZoneStyled"

export interface FileUploadDropZoneProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "accept"> {
  id: string
  accept?: string[]
  maxFileCount?: number
  maxTotalFileSizeBytes?: number
  multiple?: boolean
  disabled?: boolean
  onFiles?: (files: FileList, err: string) => void
  onDragEnter?: DragEventHandler<any> | undefined
  onDragLeave?: DragEventHandler<any> | undefined
  onDragOver?: DragEventHandler<any> | undefined
  validator?: (files: FileList) => string
}

const propTypes = {
  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  /**
   * Accepted Media type of the files uploaded. Refer https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types for more information.
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Maximum number of files can be uploaded.
   *
   */
  maxFileCount: PropTypes.number,

  /**
   * Maximum Total size of the files uploaded.
   *
   */
  maxTotalFileSizeBytes: PropTypes.number,

  /**
   * Allows upload of multiple files.
   *
   */
  multiple: PropTypes.bool,

  /**
   * Fires when files are being uploaded through drag & drop or browse button.
   */
  onFiles: PropTypes.func,
  /**
   * Callback for when the dragenter event occurs.
   */
  onDragEnter: PropTypes.func,
  /**
   * Callback for when the dragleave event occurs.
   */
  onDragLeave: PropTypes.func,
  /**
   * Callback for when the dragover event occurs.
   */
  onDragOver: PropTypes.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   */
  validator: PropTypes.func,
}

const FileUploadDropZone = forwardRef<HTMLDivElement, FileUploadDropZoneProps>(
  (
    {
      id,
      maxFileCount,
      maxTotalFileSizeBytes,
      multiple,
      disabled,
      children,
      as,
      className,
      tabIndex,
      accept,
      onFiles,
      onDragEnter,
      onDragLeave,
      onDragOver,
      validator,
      ...props
    }: FileUploadDropZoneProps,
    ref
  ) => {
    const resolvedRef = (useRef<HTMLDivElement>(null) ||
      ref) as React.MutableRefObject<HTMLDivElement>
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dragCounter = useRef(0) // workaround for drag leave event firing on parent when dragging over child div
    const [state, setState] = useState<{
      css?: string
      icon?: React.ReactElement
      message?: React.ReactElement | string
    }>(null)
    const fileDropEvents = disabled
      ? {}
      : {
          onDragEnter: function (e) {
            handleDragEnter(e)
          },
          onDragOver: function (e) {
            handleDragOver(e)
          },
          onDragLeave: function (e) {
            handleDragLeave(e)
          },
          onDrop: function (e) {
            handleDrop(e)
          },
        }

    const handleDragEnter = useCallback(
      e => {
        e.preventDefault()

        setState({
          css: "files-dropping",
          message: "Drag files here.",
        })

        dragCounter.current++

        if (onDragEnter) onDragEnter(e)
      },
      [setState]
    )

    const handleDragLeave = useCallback(
      e => {
        e.preventDefault()

        dragCounter.current--
        if (dragCounter.current === 0) {
          setState(null)
        }

        if (onDragLeave) onDragLeave(e)
      },
      [setState]
    )

    const handleDragOver = useCallback(e => {
      e.preventDefault()
      if (onDragOver) onDragOver(e)
    }, [])

    const handleFiles = useCallback(
      (files: FileList) => {
        let err = validator ? validator(files) : validateFiles(files)
        if (err) {
          setState({
            css: "files-invalid",
            icon: <i className="modus-icons">no_entry</i>,
            message: err,
          })
        } else setState(null)

        if (onFiles) onFiles(files, err)
      },
      [setState]
    )

    const handleDrop = useCallback(
      e => {
        e.preventDefault()
        handleFiles(e.dataTransfer.files)
      },
      [onFiles, setState]
    )
    const handleKeyDown = useCallback(
      e => {
        if (!disabled && (e.key == "Enter" || e.key == " "))
          fileInputRef.current.click()
      },
      [fileInputRef, disabled]
    )

    const validateFiles = useCallback(
      (files: FileList) => {
        if (files) {
          let arr = Array.from(files)

          // Accepted File types
          if (accept) {
            const invalidType = arr.find(file => !accept.includes(file.type))
            if (invalidType) {
              return `Some of the files uploaded are not matching the allowed file types(${accept.toString()})`
            }
          }

          // Total size
          if (maxTotalFileSizeBytes) {
            let totalSize = arr.reduce((tot, file) => {
              return tot + file.size
            }, 0)
            if (totalSize > maxTotalFileSizeBytes)
              return `Upload size exceeds limit. Max upload size ${bytesToSize(
                maxTotalFileSizeBytes
              )}.`
          }

          // Files count
          if (maxFileCount && arr.length > maxFileCount) {
            return `Max files can be uploaded exceeds limit. Number of files uploaded is ${arr.length} and the limit is ${maxFileCount}.`
          }

          // Multiple upload
          if (!multiple && !maxFileCount && arr.length > 1) {
            return `Multiple files cannot be uploaded.`
          }
        }
        return null
      },
      [maxFileCount, maxTotalFileSizeBytes, multiple]
    )

    function bytesToSize(bytes: number): string {
      const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"]
      if (bytes === 0) return "n/a"
      const i: number = parseInt(
        Math.floor(Math.log(bytes) / Math.log(1024)).toString()
      )
      if (i === 0) return `${bytes} ${sizes[i]}`
      return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
    }

    return (
      <FileUploadDropZoneStyled
        {...props}
        ref={resolvedRef}
        className={classNames(
          "file-drop-zone d-flex align-items-center justify-content-center",
          state && state.css,
          disabled && "disabled",
          className
        )}
        {...fileDropEvents}
        tabIndex={tabIndex || 0}
        onKeyDown={handleKeyDown}
        aria-label={props["aria-label"] || "Drop Zone"}
        aria-disabled={
          props["aria-disabled"] ? props["aria-disabled"] : disabled
        }
      >
        <div
          className={classNames(
            "d-flex flex-column text-center dropzone-content"
          )}
        >
          <input
            type="file"
            id={id}
            ref={fileInputRef}
            multiple={multiple || (maxFileCount && maxFileCount > 1)}
            className="d-none"
            onChange={e => handleFiles(e.target.files)}
          />
          {(state && state.icon) || <i className="modus-icons">cloud_upload</i>}
          <div>
            {(state && state.message) || (
              <>
                Drag files here or{" "}
                <span
                  className="text-primary browse"
                  onClick={e => !disabled && fileInputRef.current.click()}
                  tabIndex={0}
                  role="button"
                  aria-label="browse"
                  aria-disabled={
                    props["aria-disabled"] ? props["aria-disabled"] : disabled
                  }
                >
                  browse
                </span>{" "}
                to upload.
              </>
            )}
          </div>
        </div>
      </FileUploadDropZoneStyled>
    )
  }
)

FileUploadDropZone.displayName = "FileUploadDropZone"
FileUploadDropZone.propTypes = propTypes

export default FileUploadDropZone
