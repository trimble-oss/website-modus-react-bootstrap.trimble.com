<div
  class="codepen"
  data-prefill='{
    "title": "React Basics Demo",
    "description": "Shows how to use React and React DOM to render a module with props onto the page",
    "tags": ["react", "react-docs-demo"],
    "html_classes": ["loading", "no-js"],
    "head": "&lt;meta name=&#x27;viewport&#x27; content=&#x27;width=device-width, initial-scale=1&#x27;&gt;",
    "stylesheets": ["https://unpkg.com/normalize.css@8.0.1/normalize.css","https://modus.trimble.com/css/modus.min-1.3.1.css","https://modus.trimble.com/css/modus-layout.min-1.3.1.css;https://modus.trimble.com/assets/0.5.1/fonts/modus-icons.css","https://fonts.googleapis.com/icon?family=Material+Icons"],
    "scripts": ["https://unpkg.com/react@17/umd/react.development.js", "https://unpkg.com/react-dom@17/umd/react-dom.development.js", "https://cdn.jsdelivr.net/npm/@trimbleinc/modus-react-bootstrap@1/dist/react-bootstrap.min.js", "https://msankaran0712.github.io/test-codepen/import-react-bootstrap.js"]
  }'
  style="height: 400px; overflow: auto;"
  data-height="400"
  data-theme-id="dark"
  data-default-tab="js,result"
  data-editable="true"
>
  <pre data-lang="html">
 <div id="container"></div>
  </pre>
  <pre data-lang="scss">
  </pre>
  <pre data-lang="babel">
    const ChipsExample = (props) => {
      return (
        <div>
          <Chip
            icon={<i className="material-icons">check</i>}
            label="Solid"
            variant="solid"
            type="filter"
            className="mr-2"
          ></Chip>
          <Chip label="Outline" variant="outline" type="filter"></Chip>
        </div>
      );
    };
    const container= "container"

    ReactDOM.render(<ChipsExample />, document.getElementById(container));

  </pre>
</div>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
