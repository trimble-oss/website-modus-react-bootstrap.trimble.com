const reactBootstrapVersion =
  require("@trimbleinc/modus-react-bootstrap/package.json").version

const shortVersion = reactBootstrapVersion.split(".").slice(0, 2).join(".")

const config = {
  reactBootstrapVersion,
  version: require("./package.json").version,
}

export default config
