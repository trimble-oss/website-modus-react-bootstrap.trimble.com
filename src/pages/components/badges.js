import React from "react"
import { Badge, Button } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const regularBadge = `
<div>
  <Badge variant="primary" className="mr-2">
    Primary
  </Badge>
  <Badge variant="secondary" className="mr-2">
    Secondary
  </Badge>
  <Badge variant="tertiary" className="mr-2">
    Success
  </Badge>
  <Badge variant="dark" className="mr-2">
    Danger
  </Badge>
  <Badge variant="success" className="mr-2">
    Warning
  </Badge>
  <Badge variant="warning" className="mr-2">
    Info
  </Badge>
  <Badge variant="light" className="mr-2">
    Light
  </Badge>
  <Badge variant="danger">Dark</Badge>
</div>`
const scope = { Badge, Button }
const textBadge = `
<div>
  <Badge variant="text-primary">Primary</Badge>
  <Badge variant="text-secondary">Secondary</Badge>
  <Badge variant="text-dark">Dark</Badge>
  <Badge variant="text-success">Success</Badge>
  <Badge variant="text-danger">Danger</Badge>
</div>`
const counterBadge = `
<div>
  <Badge pill variant="primary" className="mr-2">
    1
  </Badge>
  <Badge pill variant="secondary" className="mr-2">
    2
  </Badge>
  <Badge pill variant="tertiary" className="mr-2">
    3
  </Badge>
  <Badge pill variant="dark" className="mr-2">
    4
  </Badge>
  <Badge pill variant="success" className="mr-2">
    5
  </Badge>
  <Badge pill variant="danger" className="mr-2">
    6
  </Badge>
  <Badge pill variant="warning">
    7
  </Badge>
</div>`
const badgeInOtherElements = `
<div className="bd-example">
  <Button variant="outline-primary">
    Button <Badge variant="primary">9</Badge>
    <span className="sr-only">unread messages</span>
  </Button>
  <Button variant="primary">
    Button <Badge variant="text-tertiary">9</Badge>
    <span className="sr-only">unread messages</span>
  </Button>

  <ul className="mt-3 list-group">
    <li className="list-group-item d-flex justify-content-between align-items-center">
      List with Badge
      <Badge pill variant="primary">
        14
      </Badge>
    </li>
  </ul>
  <ul className="mt-3 list-group">
    <li className="list-group-item d-flex justify-content-between align-items-center">
      List with Text Badge
      <Badge pill variant="text-primary">
        14
      </Badge>
    </li>
  </ul>
</div>`
const badgeSizes = `
<div>
  <Badge className="badge-sm mr-2" variant="primary">
    Small
  </Badge>
  <Badge variant="primary" className="mr-2">
    Default
  </Badge>
  <Badge className="badge-lg mr-2" variant="primary">
    Large
  </Badge>
</div>`

const BadgesPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/badges/">
      Badges scale to match the size of the immediate parent element by using
      relative font sizing and em units.
    </Overview>

    <CodeBlock title="Regular Badges" code={regularBadge} scope={scope}>
      Add any of the below mentioned modifier classes to change the appearance
      of a badge.
    </CodeBlock>

    <CodeBlock title="Text Badges" code={textBadge} scope={scope}>
      Add a <code>text-'{"theme-color"}'</code> variant to your badge for a text
      that maintains the same spacing, just without the background color.
    </CodeBlock>

    <CodeBlock title="Counter Badges" code={counterBadge} scope={scope}>
      Use the <code>pill</code> modifier class to make badges more rounded (with
      a larger <code>border-radius</code> and additional horizontal{" "}
      <code>padding</code>).
    </CodeBlock>

    <CodeBlock
      title="Badges in other elements"
      code={badgeInOtherElements}
      scope={scope}
    >
      Badges can be inserted into other elements. Just be sure to utilize our
      utility classes to position your badges appropriately.
    </CodeBlock>

    <CodeBlock title="Badge Sizes" code={badgeSizes} scope={scope}>
      By default Badges scale according to their immediate parent element but
      there are also large and small options available, use classes{" "}
      <code>badge-sm, badge-lg</code>.
    </CodeBlock>

    <LinkedHeading h="2" className="h1" id="badges-api">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.metadata} />
  </MainLayout>
)

export default BadgesPage

export const query = graphql`
  query BadgeQuery {
    metadata: componentMetadata(displayName: { eq: "Badge" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`
