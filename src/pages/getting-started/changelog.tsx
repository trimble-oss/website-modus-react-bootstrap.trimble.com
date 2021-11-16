import React from "react"
import MainLayout from "../../layouts/MainLayout"

const ChangeLogPage = props => (
  <MainLayout {...props}>
    <article id="main" className="pr-3">
      <h2 id="v093---2021-11-15" className="h1 font-weight-bold mt-5">
        v0.9.3 - 2021-11-15
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#v093---2021-11-15"
          aria-label="anchor"
        ></a>
      </h2>
      <ul>
        <li>Updated Modus Bootstrap latest version</li>
      </ul>

      <h2 id="v092---2021-11-09" className="h1 font-weight-bold mt-5">
        v0.9.2 - 2021-11-09
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#v092---2021-11-09"
          aria-label="anchor"
        ></a>
      </h2>
      <h3 id="release" className="h2 font-weight-bold mt-3">
        Release
        <a
          className="header-link text-light text-decoration-none font-weight-normal"
          href="#release"
          aria-label="anchor"
        ></a>
      </h3>
      <ul>
        <li>First official release</li>
      </ul>

      <p>
        The format is based on{" "}
        <a
          href="https://keepachangelog.com/en/1.0.0/"
          target="_blank"
          rel="noopener"
        >
          Keep a Changelog
        </a>{" "}
        and this project adheres to{" "}
        <a
          href="https://semver.org/spec/v2.0.0.html"
          target="_blank"
          rel="noopener"
        >
          Semantic Versioning
        </a>
        .
      </p>
    </article>
  </MainLayout>
)

export default ChangeLogPage
