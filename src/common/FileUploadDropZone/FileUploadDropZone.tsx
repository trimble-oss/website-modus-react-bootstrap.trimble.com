import React, {
  DragEventHandler,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import classNames from "classnames"
import * as PropTypes from "prop-types"
import FileUploadDropZoneStyled from "./FileUploadDropZoneStyled"
import { Form } from "@trimbleinc/modus-react-bootstrap"

export interface FileUploadDropZoneProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "accept"> {
  id: string
  accept?: string[]
  maxFileCount?: number
  maxTotalFileSizeBytes?: number
  multiple?: boolean
  disabled?: boolean
  uploadIcon?: React.ReactElement | boolean
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
   * Accepted File types for upload. Values should be either a valid MIME type or a file extension.
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
   * Enable multiple files upload.
   *
   */
  multiple: PropTypes.bool,

  /**
   * Set a custom upload icon or disable it.
   *
   */
  uploadIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),

  /**
   * Callback when files are being uploaded through drag & drop or browse button.
   *
   * ```js
   * function onFiles(files: FileList, err: string) => void
   *  files: (https://developer.mozilla.org/en-US/docs/Web/API/FileList)
   * ```
   */
  onFiles: PropTypes.func,
  /**
   * Callback for when the dragenter event occurs.
   *
   * ```js
   * function onDragEnter(event: React.SyntheticEvent) => void
   * ```
   */
  onDragEnter: PropTypes.func,
  /**
   * Callback for when the dragleave event occurs.
   *
   * ```js
   * function onDragLeave(event: React.SyntheticEvent) => void
   * ```
   */
  onDragLeave: PropTypes.func,
  /**
   * Callback for when the dragover event occurs.
   *
   * ```js
   * function onDragLeave(event: React.SyntheticEvent) => void
   * ```
   */
  onDragOver: PropTypes.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   *
   * ```js
   * function validator(files: FileList) => string
   *  files: (https://developer.mozilla.org/en-US/docs/Web/API/FileList)
   * ```
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
      uploadIcon,
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
    const dragCounter = useRef(0) // workaround for drag leave event firing on parent when dragging over a child div

    const [state, setState] = useState<{
      value?: string
      icon?: React.ReactElement
      message?: React.ReactElement | string
    }>(null)

    const finalUploadIcon = useMemo(() => {
      if (typeof uploadIcon === "boolean") {
        if (!uploadIcon) return null
      } else if (uploadIcon !== undefined) return uploadIcon
      return <i className="modus-icons">cloud_upload</i>
    }, [uploadIcon])

    const events = disabled
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
          onKeyDown: function (e) {
            handleKeyDown(e)
          },
        }

    const handleDragEnter = useCallback(
      e => {
        setState({
          value: "drop",
          message: "Drag files here.",
        })
        dragCounter.current++

        e.preventDefault()
        if (onDragEnter) onDragEnter(e)
      },
      [setState]
    )

    const handleDragLeave = useCallback(
      e => {
        dragCounter.current--
        if (dragCounter.current === 0) {
          setState(null)
        }

        e.preventDefault()
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
        const err = validator ? validator(files) : validateFiles(files)
        if (err) {
          setState({
            value: "error",
            icon: <i className="modus-icons">no_entry</i>,
            message: (
              <>
                {err}
                <div>
                  Click{" "}
                  <a href="#" className="text-reset" onClick={handleReset}>
                    here
                  </a>{" "}
                  to reset.
                </div>
              </>
            ),
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
        dragCounter.current = 0
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

    const handleReset = useCallback(
      e => {
        e.preventDefault()
        setState(null)
        dragCounter.current = 0
      },
      [setState, dragCounter]
    )

    const validateFiles = useCallback(
      (files: FileList) => {
        if (files) {
          let arr = Array.from(files)

          // Accepted File types
          if (accept) {
            const acceptedTypes = new Set(accept)
            const fileExtensionRegExp = new RegExp(".[0-9a-z]+$", "i")
            const invalidType = arr.find(({ name, type }) => {
              const hasFileExtension = fileExtensionRegExp.test(name)
              if (!hasFileExtension) {
                return true
              }
              const [fileExtension] = name.match(fileExtensionRegExp)

              if (
                acceptedTypes.has(type) ||
                acceptedTypes.has(fileExtension.toLowerCase())
              ) {
                return false
              }
              return true
            })
            if (invalidType) {
              return `Some of the files uploaded are not matching the allowed File types (${accept
                .map(item => `\"${item}\"`)
                .join(", ")
                .toString()}).`
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
        {...events}
        {...props}
        ref={resolvedRef}
        className={classNames(
          "d-flex align-items-center justify-content-center",
          className
        )}
        state={(disabled && "disabled") || (state && state.value) || "default"}
        tabIndex={tabIndex || 0}
        aria-label={props["aria-label"] || "Drop Zone"}
        aria-disabled={
          props["aria-disabled"] ? props["aria-disabled"] : disabled
        }
      >
        <div className="w-100 h-100 file-drop-zone-overlay"></div>
        <div
          className={classNames(
            "file-drop-zone-content d-flex flex-column text-center p-3"
          )}
        >
          {(state && state.icon) || finalUploadIcon}
          <div>
            {(state && state.message) || (
              <>
                Drag files here or{" "}
                <Form.File
                  id={id}
                  className="p-0 m-0 d-inline"
                  disabled={disabled}
                >
                  <Form.File.Label
                    className="p-0 m-0 text-primary browse"
                    tabIndex={0}
                    role="button"
                    aria-label="browse"
                    aria-disabled={
                      props["aria-disabled"] ? props["aria-disabled"] : disabled
                    }
                  >
                    browse
                  </Form.File.Label>
                  <Form.File.Input
                    className="d-none"
                    disabled={disabled}
                    ref={fileInputRef}
                    onChange={e => handleFiles(e.target.files)}
                    multiple={multiple || (maxFileCount && maxFileCount > 1)}
                  />
                </Form.File>{" "}
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
