import React from "react"
import MainLayout from "../../layouts/MainLayout"

const StatusPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <table className="table table-striped status-table">
        <thead className="border-0">
          <tr>
            <th
              scope="col"
              style={{ width: "20%" }}
              className="align-bottom border-0 sticky-top sticky-offset"
            >
              Element
            </th>
            <th
              scope="col"
              style={{ width: "20%" }}
              className="align-bottom border-0 sticky-top sticky-offset"
            >
              Modus React Bootstrap
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/accordions/">Accordions</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/alerts/">Alerts</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/badges/">Badges</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/breadcrumbs/">Breadcrumbs</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/buttons/">Buttons</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/cards/">Cards</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/checkboxes/">Checkboxes</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/chips/">Chips</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>

          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/modals/">Dialogs and Modals</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/dropdowns/">Dropdowns</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>

          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/inputs/">Inputs</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>

          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/lists/">Lists</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/spinners/">Loaders/Spinner</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>

          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/pagination/">Pagination</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>

          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/progress-bar/">Progress Bar</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/radio-buttons/">Radio Buttons</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/foundations/shadows-and-depth/">Shadows</a>
            </th>
            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/sliders/">Sliders</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/checkboxes/#switches">Switches</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/tables/">Tables</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/tabs/">Tabs</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/toasts/">Toasts</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
          <tr>
            <th className="align-middle" scope="row">
              <a href="/components/tooltips/">Tooltips</a>
            </th>

            <td>
              <span className="badge badge-success badge-pill">0.9.2</span>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </MainLayout>
)

export default StatusPage