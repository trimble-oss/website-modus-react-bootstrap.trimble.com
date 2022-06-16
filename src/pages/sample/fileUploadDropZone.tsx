import * as React from "react"
import {
  Container,
  Row,
  FileUploadDropZone,
} from "@trimbleinc/modus-react-bootstrap"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import "../../assets/css/main.scss"

const Example = () => {
  const [filesUploaded, setFilesUploaded] = React.useState<FileList | null>(
    null
  )

  return (
    <div>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (25 MB total)</h4>
      <FileUploadDropZone
        id="test"
        maxFileCount={2}
        maxTotalFileSizeBytes={5000}
        onFiles={(files, err) => {
          if (!err) setFilesUploaded(files)
        }}
        style={{ width: "400px", height: "200px" }}
        aria-label="Drop Zone"
      ></FileUploadDropZone>

      {filesUploaded && (
        <>
          <h4 className="mt-5">Files uploaded:</h4>
          <ul className="list-group list-group-borderless">
            {Array.from(filesUploaded).map(file => (
              <li className="list-group-item list-item-left-control">
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
const FileUploadPage = props => {
  return (
    <main id="main">
      <ModusIconsScripts />
      <Container fluid className="pt-5">
        <Container>
          <Row>
            <Example />
          </Row>
        </Container>
      </Container>
    </main>
  )
}

export default FileUploadPage
