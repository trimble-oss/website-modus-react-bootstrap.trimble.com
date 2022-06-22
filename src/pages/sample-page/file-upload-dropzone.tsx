/**
 * Sample page to test accessibility and performance
 */
import React from "react"
import { FileUploadDropZone } from "@trimbleinc/modus-react-bootstrap"

import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../../common/ExternalDependencyHelper"

function FileUploadDropZoneBasic() {
  const [filesUploaded, setFilesUploaded] = React.useState(null)

  return (
    <div>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (5 MB total)</h4>
      <h5>Supported file types are pdf and images.</h5>
      <FileUploadDropZone
        id="test1"
        maxFileCount={3}
        maxTotalFileSizeBytes={5242880}
        accept=".pdf,image/*"
        onFiles={(files, err) => {
          if (!err) setFilesUploaded(files)
          else setFilesUploaded(null)
        }}
        style={{ maxWidth: "400px", height: "200px" }}
      ></FileUploadDropZone>
      {filesUploaded && (
        <>
          <h4 className="mt-5">Files uploaded:</h4>
          <ul className="list-group list-group-borderless">
            {Array.from(filesUploaded).map((file, index) => (
              <li
                className="list-group-item list-item-left-control"
                key={index}
              >
                <i className="modus-icons">check_circle</i>
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function FileUploadDropZoneCustomValidation() {
  const [filesUploaded, setFilesUploaded] = React.useState(null)

  return (
    <div>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (5 MB total)</h4>
      <FileUploadDropZone
        id="test2"
        onFiles={(files, err) => {
          if (!err) setFilesUploaded(files)
          else setFilesUploaded(null)
        }}
        validator={files => {
          if (files.length > 1)
            return "Custom Validation Message: Multiple files upload is not allowed at a time."
          return null
        }}
        style={{ maxWidth: "400px", height: "200px" }}
      ></FileUploadDropZone>
      {filesUploaded && (
        <>
          <h4 className="mt-5">Files uploaded:</h4>
          <ul className="list-group list-group-borderless">
            {Array.from(filesUploaded).map((file, index) => (
              <li
                className="list-group-item list-item-left-control"
                key={index}
              >
                <i className="modus-icons">check_circle</i>
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

const Content = ({ title, content }) => (
  <div className="grid-item bg-white">
    <h3 id={`title-${title.replace(" ", "")}`}>{title}</h3>
    {content}
  </div>
)

export default function FileUploadDropZonePage(props) {
  return (
    <div className="grid-layout">
      {!props.excludeIconScript && <ModusIconsScripts />}
      {!props.excludeLayoutScript && <ModusLayoutScripts />}

      <Content title="Basic" content={<FileUploadDropZoneBasic />} />
      <Content
        title="Custom Validation"
        content={<FileUploadDropZoneCustomValidation />}
      />
    </div>
  )
}
