const modusReactBootstrapVersion =
  require("@trimbleinc/modus-react-bootstrap/package.json").version

const shortVersion = modusReactBootstrapVersion.split(".").slice(0, 2).join(".")

const config = {
  modusReactBootstrapVersion,
  version: require("./package.json").version,
}

export default config
