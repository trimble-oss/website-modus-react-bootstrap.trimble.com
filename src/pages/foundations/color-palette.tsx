import React from "react"
import MainLayout from "../../layouts/MainLayout"

const ColorPalettePage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <h2 id="overview" className="h1 font-weight-bold mt-5">
        Overview
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#overview"
          aria-label="anchor"
        ></a>
      </h2>
      <p>Our framework includes 4 sets of colors:</p>
      <ul>
        <li>
          <a href="#modus-colors">Modus Colors</a>
        </li>
        <li>
          <a href="#ui-colors">UI Colors</a>
        </li>
        <li>
          <a href="#primary-palette">Primary Palette</a>
        </li>
        <li>
          <a href="#gray-colors">Gray Colors</a>
        </li>
      </ul>
      <p>
        Each set of colors has its own set of utility classes that modify
        background color, font color, and border color. You can reference the
        available utility classes below:
      </p>
      <h3 id="modus-colors" className="h2 font-weight-bold mt-3">
        Modus Colors
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#modus-colors"
          aria-label="anchor"
        ></a>
      </h3>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-primary">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Primary Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #0063a3
              </div>
              <code className="d-block small mr-1">.bg-primary</code>
              <code className="d-block small mr-1">.text-primary</code>
              <code className="d-block small mr-1">.border-primary</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-secondary">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Secondary Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #6a6e79
              </div>
              <code className="d-block small mr-1">.bg-secondary</code>
              <code className="d-block small mr-1">.text-secondary</code>
              <code className="d-block small mr-1">.border-secondary</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-tertiary">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Tertiary Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #cbcdd6
              </div>
              <code className="d-block small mr-1">.bg-tertiary</code>
              <code className="d-block small mr-1">.text-tertiary</code>
              <code className="d-block small mr-1">.border-tertiary</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-dark">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Dark Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #252a2e
              </div>
              <code className="d-block small mr-1">.bg-dark</code>
              <code className="d-block small mr-1">.text-dark</code>
              <code className="d-block small mr-1">.border-dark</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-success">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Success Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #006638
              </div>
              <code className="d-block small mr-1">.bg-success</code>
              <code className="d-block small mr-1">.text-success</code>
              <code className="d-block small mr-1">.border-success</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-warning">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Warning Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #e49325
              </div>
              <code className="d-block small mr-1">.bg-warning</code>
              <code className="d-block small mr-1">.text-warning</code>
              <code className="d-block small mr-1">.border-warning</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-danger">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Danger Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #da212c
              </div>
              <code className="d-block small mr-1">.bg-danger</code>
              <code className="d-block small mr-1">.text-danger</code>
              <code className="d-block small mr-1">.border-danger</code>
            </div>
          </div>
        </div>
      </div>
      <h3 id="ui-colors" className="h2 font-weight-bold mt-3">
        UI Colors
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#ui-colors"
          aria-label="anchor"
        ></a>
      </h3>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-main-background">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Main Background Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #ffffff
              </div>
              <code className="d-block small mr-1">.bg-main-background</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-panel-background">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Panel Background Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #f1f1f6
              </div>
              <code className="d-block small mr-1">.bg-panel-background</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-active">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Active Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #217cbb
              </div>
              <code className="d-block small mr-1">.bg-active</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-hover">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Hover Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #e0e1e9
              </div>
              <code className="d-block small mr-1">.bg-hover</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-selected">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Selected Color</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #dcedf9
              </div>
              <code className="d-block small mr-1">.bg-selected</code>
            </div>
          </div>
        </div>
      </div>
      <h3 id="primary-palette" className="h2 font-weight-bold mt-3">
        Primary Palette
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#primary-palette"
          aria-label="anchor"
        ></a>
      </h3>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-trimble-blue-dark">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Trimble Blue Dark</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #004f83
              </div>
              <code className="d-block small mr-1">.bg-trimble-blue-dark</code>
              <code className="d-block small mr-1">
                .text-trimble-blue-dark
              </code>
              <code className="d-block small mr-1">
                .border-trimble-blue-dark
              </code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-trimble-blue">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Trimble Blue</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #0063a3
              </div>
              <code className="d-block small mr-1">.bg-trimble-blue</code>
              <code className="d-block small mr-1">.text-trimble-blue</code>
              <code className="d-block small mr-1">.border-trimble-blue</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-trimble-yellow">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Trimble Yellow</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #fbad26
              </div>
              <code className="d-block small mr-1">.bg-trimble-yellow</code>
              <code className="d-block small mr-1">.text-trimble-yellow</code>
              <code className="d-block small mr-1">.border-trimble-yellow</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-trimble-gray">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Trimble Gray</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #252A2E
              </div>
              <code className="d-block small mr-1">.bg-trimble-gray</code>
              <code className="d-block small mr-1">.text-trimble-gray</code>
              <code className="d-block small mr-1">.border-trimble-gray</code>
            </div>
          </div>
        </div>
      </div>
      <h3 id="gray-colors" className="h2 font-weight-bold mt-3">
        Gray Colors
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#gray-colors"
          aria-label="anchor"
        ></a>
      </h3>
      <p>Various shades of gray for utility.</p>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-trimble-gray">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Trimble Gray</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #252A2E
              </div>
              <code className="d-block small mr-1">.bg-trimble-gray</code>
              <code className="d-block small mr-1">.text-trimble-gray</code>
              <code className="d-block small mr-1">.border-trimble-gray</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-10">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 10</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #171C1E
              </div>
              <code className="d-block small mr-1">.bg-gray-10</code>
              <code className="d-block small mr-1">.text-gray-10</code>
              <code className="d-block small mr-1">.border-gray-10</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-9">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 9</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #353A40
              </div>
              <code className="d-block small mr-1">.bg-gray-9</code>
              <code className="d-block small mr-1">.text-gray-9</code>
              <code className="d-block small mr-1">.border-gray-9</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-8">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 8</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #464B52
              </div>
              <code className="d-block small mr-1">.bg-gray-8</code>
              <code className="d-block small mr-1">.text-gray-8</code>
              <code className="d-block small mr-1">.border-gray-8</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-7">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 7</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #585C65
              </div>
              <code className="d-block small mr-1">.bg-gray-7</code>
              <code className="d-block small mr-1">.text-gray-7</code>
              <code className="d-block small mr-1">.border-gray-7</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-6">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 6</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #6A6E79
              </div>
              <code className="d-block small mr-1">.bg-gray-6</code>
              <code className="d-block small mr-1">.text-gray-6</code>
              <code className="d-block small mr-1">.border-gray-6</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-5">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 5</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #7d808d
              </div>
              <code className="d-block small mr-1">.bg-gray-5</code>
              <code className="d-block small mr-1">.text-gray-5</code>
              <code className="d-block small mr-1">.border-gray-5</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-4">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 4</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #90939F
              </div>
              <code className="d-block small mr-1">.bg-gray-4</code>
              <code className="d-block small mr-1">.text-gray-4</code>
              <code className="d-block small mr-1">.border-gray-4</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-3">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 3</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #a3a6b1
              </div>
              <code className="d-block small mr-1">.bg-gray-3</code>
              <code className="d-block small mr-1">.text-gray-3</code>
              <code className="d-block small mr-1">.border-gray-3</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-2">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 2</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #e2e2e7
              </div>
              <code className="d-block small mr-1">.bg-gray-2</code>
              <code className="d-block small mr-1">.text-gray-2</code>
              <code className="d-block small mr-1">.border-gray-2</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-1">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 1</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #cbcdd6
              </div>
              <code className="d-block small mr-1">.bg-gray-1</code>
              <code className="d-block small mr-1">.text-gray-1</code>
              <code className="d-block small mr-1">.border-gray-1</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-0">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray 0</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #EAEAEF
              </div>
              <code className="d-block small mr-1">.bg-gray-0</code>
              <code className="d-block small mr-1">.text-gray-0</code>
              <code className="d-block small mr-1">.border-gray-0</code>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
          <div className="card h-100 w-100 shadow-sm">
            <div className="card-img-top bg-gray-light">
              <div className="py-4 py-lg-5"></div>
            </div>
            <div className="card-body pb-2 mb-1">
              <div className="card-title mb-1">
                <h5 className="mb-0 pb-0">Gray Light</h5>
              </div>
              <div className="text-lowercase text-monospace mb-1 h4 text-secondary font-weight-normal">
                #F1F1F6
              </div>
              <code className="d-block small mr-1">.bg-gray-light</code>
              <code className="d-block small mr-1">.text-gray-light</code>
              <code className="d-block small mr-1">.border-gray-light</code>
            </div>
          </div>
        </div>
      </div>
    </article>
  </MainLayout>
)

export default ColorPalettePage
