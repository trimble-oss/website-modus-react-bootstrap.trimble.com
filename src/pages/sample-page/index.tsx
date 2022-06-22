import * as React from "react"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../../common/ExternalDependencyHelper"
import logo from "../../assets/img/trimble-logo.svg"
import "../../assets/css/main.scss"
import styled from "styled-components"
import ContentTreePage from "./content-tree"
import FileUploadDropZonePage from "./file-upload-dropzone"
import TablePage from "./table"
import SEO from "../../seo"

const Styled = styled.div`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .sample-page-content {
    padding: 1rem;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 1rem;
    grid-auto-rows: minmax(180px, auto);
    grid-auto-flow: dense;
  }

  .grid-item {
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 1080px;
  }

  @media all and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .grid-item {
      max-width: 680px;
      min-width: 680px;
      width: 680px;
    }
  }

  .span-2 {
    grid-column-end: span 2;
  }

  .span-3 {
    grid-column-end: span 3;
  }

  .colors > div {
    margin-top: 0.5rem;
  }

  .colors h6 {
    padding: 0.5rem;
    margin-bottom: 0;
  }

  .spaced-right > * {
    margin-right: 0.5rem;
  }

  .spaced-bottom > * {
    margin-bottom: 0.5rem;
  }
`

export default function SamplePage() {
  return (
    <Styled className="modus-layout">
      {!props.excludeSEO && (
        <SEO title={"Sample test page"} description={"Sample test page"} />
      )}
      <ModusIconsScripts />
      <ModusLayoutScripts />
      <nav className="navbar navbar-expand-sm flex-nowrap modus-header">
        <a data-modus-item="menu-btn">
          <i className="modus-icons menu-btn bg-white">menu</i>
        </a>
        <a href="/sample-page/" className="navbar-brand d-none d-md-block">
          <img src={logo} width="127" height="30" alt="Trimble" />
        </a>
        <div className="navbar-text text-truncate">
          <span className="h2 text-dark m-0">
            Modus React Bootstrap Sample Page
          </span>
        </div>
        <div className="ml-auto border-left pl-3 py-2 d-none">
          <div className="custom-control custom-switch custom-control-inline">
            <input
              type="checkbox"
              id="style-switch"
              className="custom-control-input"
              name="example1"
            />
            <label className="custom-control-label label-lg" for="style-switch">
              Dark Mode
            </label>
          </div>
        </div>
      </nav>

      <div className="modus-body sidebar-closed" data-modus-item="body">
        <nav className="nav flex-column modus-sidebar">
          <ul>
            <li>
              <a href="/sample-page" className="nav-link active">
                <span className="left-nav-icon">
                  <i className="modus-icon material-icons">home</i>
                </span>
                Sample Page
              </a>
              <ul>
                <li className="my-1">
                  <a
                    href="#content-tree"
                    className="ml-5 pl-3 font-weight-bold"
                  >
                    Content Tree
                  </a>
                </li>
                <li className="my-1">
                  <a
                    href="#file-upload-dropzone"
                    className="ml-5 pl-3 font-weight-bold"
                  >
                    File Upload Dropzone
                  </a>
                </li>
                <li className="my-1">
                  <a href="#table" className="ml-5 pl-3 font-weight-bold">
                    Table
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="modus-content-rows" role="main">
          <div className="modus-content-columns">
            <div className="modus-content sample-page-content">
              <h2 id="content-tree" role="heading" className="font-weight-bold">
                Content Tree
              </h2>

              <ContentTreePage
                excludeIconScript={true}
                excludeLayoutScript={true}
                excludeSEO={true}
              />

              <h2
                id="file-upload-dropzone"
                role="heading"
                className="font-weight-bold"
              >
                File Upload Dropzone
              </h2>

              <FileUploadDropZonePage
                excludeIconScript={true}
                excludeLayoutScript={true}
                excludeSEO={true}
              />

              <h2 id="table" role="heading" className="font-weight-bold">
                Table
              </h2>

              <TablePage
                excludeIconScript={true}
                excludeLayoutScript={true}
                excludeSEO={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Styled>
  )
}
