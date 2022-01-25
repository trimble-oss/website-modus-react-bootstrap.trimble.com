import * as React from "react"
import config from "../../config"
import logo from "../assets/img/trimble-logo-rev.svg"

const Footer = () => {
  const copyRightYear = new Date().getFullYear()
  return (
    <footer className="p-2 footer py-4">
      <div className="container text-white">
        <div className="row pt-2">
          <div className="col-12 mb-4 mt-2">
            <img src={logo} width="107" height="25" alt="Trimble" />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-11 col-md-5 col-lg-4">
            <p>
              Trimble is transforming the way the world works by delivering
              products and services that connect the physical and digital
              worlds.
            </p>
          </div>
          <div className="col-12 col-sm-1 col-lg-4"></div>
          <div className="col-6 col-md-3 col-lg-2">
            <p className="h5" hidden>
              About Modus
            </p>
            <ul className="list-unstyled">
              <li className="my-3 my-sm-2">
                <a href="/getting-started/" className="py-2">
                  Getting Started
                </a>
              </li>
              <li className="my-3 my-sm-2">
                <a href="/getting-started/changelog/" className="py-2">
                  Changelog
                </a>
              </li>
              <li className="my-3 my-sm-2">
                <a href="/getting-started/status/" className="py-2">
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <p className="h5" hidden>
              Help
            </p>
            <ul className="list-unstyled">
              <li className="my-3 my-sm-2">
                <a
                  href="https://currents.google.com/u/0/communities/106752401938284014662"
                  rel="noopener"
                  target="_blank"
                  className="py-2"
                >
                  Community Forum
                </a>
              </li>
              <li className="my-3 my-sm-2">
                <a
                  href="mailto:modus-ug+subscribe@trimble.com"
                  className="py-2"
                  rel="nofollow"
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-12 border-top border-light opacity-50"></div>
        </div>
        <div className="row pt-2">
          <div className="col-12 col-sm-6 small">
            {`Copyright © ${copyRightYear}, Trimble Inc.`}
          </div>
          <div className="col-12 col-sm-6 text-sm-right small">
            <a
              href="https://www.trimble.com/en/legal/terms-and-conditions/terms-of-use"
              target="_blank"
            >
              Terms of Use
            </a>
            - Modus React Bootstrap Version: {config.modusReactBootstrapVersion}
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
