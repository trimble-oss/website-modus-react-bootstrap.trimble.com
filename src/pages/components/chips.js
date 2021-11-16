import React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import { Chip } from "@trimbleinc/modus-react-bootstrap"
import LinkedHeading from "../../common/LinkedHeading"
import chipImage from "../../assets/img/headshot.png" // relative path to image
import MainLayout from "../../layouts/MainLayout"
import ComponentApi from "../../api-docs/ComponentApi"

const ChipsPage = props => {
  return (
    <MainLayout {...props}>
      <Overview guidelink="https://modus.trimble.com/components/chips/">
        Chips are used to add information, make selections or filter content.
        Chips should appear dynamically as a group of multiple interactive
        elements.
        <p>
          To Use Chip, add <code>&lt;Chip&gt;</code> component with{" "}
          <code>variant</code> like,
          <ul>
            <li>solid</li>
            <li>outline</li>
            <li>reverse</li>
          </ul>
        </p>
        Use <code>label</code> for adding text and <code>avatar</code>,{" "}
        <code> icon </code> props for adding thumbnail & icon respectively.
      </Overview>

      <CodeBlock
        scope={{ Chip, chipImage }}
        title="Input Chips"
        code={`
<div>
  <Chip
    avatar={<img src={chipImage} alt="" />}
    label="Solid"
    dismissible
    variant="solid"
    type="input"
    className="mr-2"
  ></Chip>
  <Chip
    avatar={<img src={chipImage} alt="" />}
    label="Outline"
    dismissible
    variant="outline"
    type="input"
  ></Chip>
</div>
`}
      >
        For input chips use the prop <code>type</code> set to <code>input</code>
        .
      </CodeBlock>

      <CodeBlock
        title="Live Example"
        scope={{ useState, Chip, chipImage }}
        noInline={true}
        code={`function Example() {
  const [showSolid, setShowSolid] = useState(true);
  const [showOutline, setShowOutline] = useState(true);

  const handleSolid = () => setShowSolid(!showSolid);
  const handleOutline = () => setShowOutline(!showOutline);

  return (
    <div>
        <Chip
          avatar={<img src={chipImage} alt="" />}
          label="Solid"
          onClose={handleSolid}
          show={showSolid}
          variant="solid"
          type="input"
          className="mr-2"
        ></Chip>
        <Chip
          avatar={<img src={chipImage} alt="" />}
          label="Outline"
          onClose={handleOutline}
          show={showOutline}
          variant="outline"
          type="input"
        ></Chip>
      </div>
  );
}

render(<Example />);`}
      >
        Chips with the <code>onClose</code> or <code>dismissible </code> prop
        defined will display a delete icon and can also use prop{" "}
        <code>show</code> to control the visibility of the chip.
      </CodeBlock>

      <CodeBlock
        title="Filter Chips"
        scope={{ Chip }}
        code={`
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
`}
      >
        For Filter Chips, use the <code>icon</code> prop to define the icon.
      </CodeBlock>

      <CodeBlock
        title="Small Chips"
        scope={{ Chip, chipImage }}
        code={`
<div>
  <Chip
    avatar={<img src={chipImage} alt="" />}
    label="Solid"
    dismissible
    variant="solid"
    type="input"
    size="sm"
    className="mr-2"
  ></Chip>
  <Chip
    avatar={<img src={chipImage} alt="" />}
    label="Outline"
    dismissible
    variant="outline"
    type="input"
    closeIcon={<i className="modus-icon material-icons">cancel</i>}
    size="sm"
    className="mr-2"
  ></Chip>
  <Chip
    icon={<i className="modus-icon material-icons">check</i>}
    label="Solid"
    variant="solid"
    type="filter"
    size="sm"
    className="mr-2"
  ></Chip>
  <Chip label="Outline" variant="outline" type="filter" size="sm"></Chip>
</div>
`}
      >
        To use a small chip, use <code>size</code> prop and use{" "}
        <code>closeIcon</code> props for custom close icon.
      </CodeBlock>

      <LinkedHeading h="2" className="h1" id="chip-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={props.data.Chip} />
    </MainLayout>
  )
}

export default ChipsPage

export const query = graphql`
  query ChipQuery {
    Chip: componentMetadata(displayName: { eq: "Chip" }) {
      ...ComponentApi_metadata
    }
  }
`
