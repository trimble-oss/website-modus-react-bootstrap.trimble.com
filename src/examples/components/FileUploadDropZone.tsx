export const FileUploadDropZoneBasic = `
const Example = () => {
  const [filesUploaded, setFilesUploaded] = React.useState(null)

  return (
    <div style={{ width: "400px", height: "200px" }}>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (25 MB total)</h4>
      <FileUploadDropZone
        id="test"
        maxFileCount={2}
        maxTotalFileSizeBytes={5000}
        onFiles={(files, err) => setFilesUploaded(files)}
      ></FileUploadDropZone>
      <h4 className="mt-5">Files uploaded:</h4>
      <ul className="list-group list-group-borderless">
        {filesUploaded &&
          Array.from(filesUploaded).map(file => (
            <li className="list-group-item list-item-left-control">
              <i className="modus-icons">check_circle</i>
              <span>{file.name}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
render(<Example />);
`
