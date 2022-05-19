import * as React from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import "../../assets/css/main.scss"
import FileUploadDropZone from "../../common/FileUploadDropZone/FileUploadDropZone"

const FileUploadPage = props => {
  return (
    <main id="main">
      <ModusIconsScripts />
      <Container fluid className="pt-5">
        <Container>
          <Row>
            <div className="col-12 col-lg-6 pt-5 mt-xl-5">
              <div style={{ width: "400px" }}>
                <h3 className="display-3">Upload Files</h3>
                <h4>Max: 3 files (25 MB total)</h4>
                <FileUploadDropZone
                  id="test"
                  maxFileCount={2}
                  maxTotalFileSizeBytes={5000}
                ></FileUploadDropZone>
              </div>
            </div>
          </Row>
        </Container>
      </Container>
    </main>
  )
}

export default FileUploadPage
