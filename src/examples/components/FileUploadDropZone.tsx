export const FileUploadDropZoneBasic = `
function Example() {
  const [filesUploaded, setFilesUploaded] = React.useState(null)

  return (
    <div>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (5 MB total)</h4>
      <h5>Supported file types are .pdf, .jpg and .png</h5>
      <FileUploadDropZone
        id="test1"
        maxFileCount={2}
        maxTotalFileSizeBytes={5242880}
        accept={[".pdf","image/jpeg","image/png"]}
        onFiles={(files, err) => {
          if(!err) setFilesUploaded(files)
          else setFilesUploaded(null)
          }
        }
        style={{ width: "400px", height: "200px" }}
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
  );
}
render(<Example />);`

export const FileUploadDropZoneCustomValidation = `
function Example() {
  const [filesUploaded, setFilesUploaded] = React.useState(null)

  return (
    <div>
      <h3 className="display-3">Upload Files</h3>
      <h4>Max: 3 files (5 MB total)</h4>
      <FileUploadDropZone
        id="test2"
        onFiles={(files, err) => {
          if(!err) setFilesUploaded(files)
          else setFilesUploaded(null)
          }
        }
        validator={(files) => {
          if(files.length > 1)
            return "Custom Validation Message: Multiple files upload is not allowed at a time."
        }}
        style={{ width: "400px", height: "200px" }}
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
  );
}
render(<Example />);`
