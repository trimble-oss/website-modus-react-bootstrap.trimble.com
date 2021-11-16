import { Tab, Tabs } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const TabsPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/tabs/">
      Create dynamic tabbed interfaces, as described in the{" "}
      <a href="https://www.w3.org/TR/wai-aria-practices/#tabpanel">
        <abbr title="Web Accessibility Initiative">WAI</abbr>{" "}
        <abbr title="Accessible Rich Internet Applications">ARIA</abbr>{" "}
        Authoring Practices
      </a>
      . <code>Tabs</code> is a higher-level component for quickly creating a{" "}
      <code>Nav</code> matched with a set of <code>TabPane</code>s.
    </Overview>

    <CodeBlock
      title="Basic Tabs"
      scope={{ Tabs, Tab }}
      code={`
<Tabs defaultActiveKey="home" id="tab-example">
  <Tab eventKey="home" title="Active"></Tab>
  <Tab eventKey="tab" title="Tab"></Tab>
  <Tab eventKey="longtab" title="Longer Tab Name"></Tab>
  <Tab eventKey="disabledtab" title="Disabled" disabled></Tab>
</Tabs>
`}
    ></CodeBlock>

    <CodeBlock
      title="Tabs with Icons"
      scope={{ Tabs, Tab }}
      code={`
<Tabs defaultActiveKey="home" id="tab-example">
  <Tab
    eventKey="home"
    title={<i className="modus-icon material-icons">mood</i>}
  ></Tab>
  <Tab
    eventKey="tab"
    title={<i className="modus-icon material-icons">face</i>}
  ></Tab>
  <Tab
    eventKey="longtab"
    title={<i className="modus-icon material-icons">sentiment_satisfied</i>}
  ></Tab>
  <Tab
    eventKey="disabledtab"
    title={
      <i className="modus-icon material-icons">sentiment_very_dissatisfied</i>
    }
    disabled
  ></Tab>
</Tabs>
`}
    ></CodeBlock>

    <CodeBlock
      title="Small Tabs"
      scope={{ Tabs, Tab }}
      code={`
<div>
  <Tabs defaultActiveKey="home" className="nav-tabs-sm" id="tab-example1">
    <Tab eventKey="home" title="Active"></Tab>
    <Tab eventKey="tab" title="Tab"></Tab>
    <Tab eventKey="longtab" title="Longer Tab Name"></Tab>
    <Tab eventKey="disabledtab" title="Disabled" disabled></Tab>
  </Tabs>
  <br />

  <Tabs defaultActiveKey="home" className="nav-tabs-sm" id="tab-example2">
    <Tab
      eventKey="home"
      title={<i className="modus-icon material-icons">mood</i>}
    ></Tab>
    <Tab
      eventKey="tab"
      title={<i className="modus-icon material-icons">face</i>}
    ></Tab>
    <Tab
      eventKey="longtab"
      title={<i className="modus-icon material-icons">sentiment_satisfied</i>}
    ></Tab>
    <Tab
      eventKey="disabledtab"
      title={
        <i className="modus-icon material-icons">sentiment_very_dissatisfied</i>
      }
      disabled
    ></Tab>
  </Tabs>
</div>
`}
    >
      To use smaller variants of tabs, add the <code>.nav-tabs-sm</code> class.
    </CodeBlock>

    <CodeBlock
      title="Tabs with Content"
      scope={{ Tabs, Tab }}
      code={`
<Tabs defaultActiveKey="home" id="tab-example">
  <Tab eventKey="home" title="First tab">
    <div className="py-3">
      <h5 id="first-tab-content">First Tab Content</h5>
      <p>
        Placeholder content for the tab panel. This one relates to the First
        tab. Takes you miles high, so high, 'cause she’s got that one
        international smile. There's a stranger in my bed, there's a pounding in
        my head. Oh, no. In another life I would make you stay.
      </p>
    </div>
  </Tab>
  <Tab eventKey="tab" title="Second tab content">
    <div className="py-3">
      <h5 id="second-tab-content">Second Tab Content</h5>
      <p>
        Placeholder content for the tab panel. This one relates to the Second
        tab. You got the finest architecture. Passport stamps, she's
        cosmopolitan. Fine, fresh, fierce, we got it on lock. Never planned that
        one day I'd be losing you. She eats your heart out.
      </p>
    </div>
  </Tab>
  <Tab eventKey="longtab" title="Third Tab Content">
    <div className="py-3">
      <h5 id="third-tab-content">Third Tab Content</h5>
      <p>
        Placeholder content for the tab panel. This one relates to the Third
        tab. Her love is like a drug. All my girls vintage Chanel baby. Got a
        motel and built a fort out of sheets. 'Cause she's the muse and the
        artist. (This is how we do) So you wanna play with magic.
      </p>
    </div>
  </Tab>
  <Tab eventKey="disabledtab" title="Disabled Tab" disabled>
    <div className="py-3">
      {" "}
      <h5 id="disabled-tab-content">Disabled Tab Content</h5>
      <p>This content is disabled and unviewable.</p>
    </div>
  </Tab>
</Tabs>
`}
    >
      No additional code is required to handle tabs with content.
    </CodeBlock>

    <LinkedHeading h="2" id="tabs-api" className="h1">
      API
    </LinkedHeading>

    <ComponentApi metadata={props.data.Tabs} />
    <ComponentApi metadata={props.data.Tab} />
    <ComponentApi metadata={props.data.TabContainer} />
    <ComponentApi metadata={props.data.TabContent} />
    <ComponentApi metadata={props.data.TabPane} />
  </MainLayout>
)

export default TabsPage

export const query = graphql`
  query TabsQuery {
    Tabs: componentMetadata(displayName: { eq: "Tabs" }) {
      ...ComponentApi_metadata
    }
    Tab: componentMetadata(displayName: { eq: "Tab" }) {
      ...ComponentApi_metadata
    }
    TabContainer: componentMetadata(displayName: { eq: "TabContainer" }) {
      ...ComponentApi_metadata
    }
    TabContent: componentMetadata(displayName: { eq: "TabContent" }) {
      ...ComponentApi_metadata
    }
    TabPane: componentMetadata(displayName: { eq: "TabPane" }) {
      ...ComponentApi_metadata
    }
  }
`
