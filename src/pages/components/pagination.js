import { Pagination } from "@trimbleinc/modus-react-bootstrap"
import CodeBlock from "../../common/CodeBlock"
import Overview from "../../common/Overview"
import React from "react"
import MainLayout from "../../layouts/MainLayout"
import { graphql } from "gatsby"
import ComponentApi from "../../api-docs/ComponentApi"
import LinkedHeading from "../../common/LinkedHeading"

const PaginationPage = props => (
  <MainLayout {...props}>
    <Overview guidelink="https://modus.trimble.com/components/pagination/">
      We use a large block of connected links for our pagination, making links
      hard to miss and easily scalable—all while providing large hit areas.
      Pagination is built with list HTML elements so screen readers can announce
      the number of available links. Use a wrapping <code>&lt;nav&gt;</code>{" "}
      element to identify it as a navigation section to screen readers and other
      assistive technologies.
    </Overview>

    <CodeBlock
      title="Example"
      scope={{ Pagination }}
      code={`
<nav aria-label="...">
  <Pagination>
    <Pagination.Item>
      <i className="modus-icons">chevron_left</i>
    </Pagination.Item>
    <Pagination.Item>
      <i className="modus-icons">more_horizontal</i>
    </Pagination.Item>

    <Pagination.Item>{3}</Pagination.Item>
    <Pagination.Item>{4}</Pagination.Item>
    <Pagination.Item active>{5}</Pagination.Item>
    <Pagination.Item>{6}</Pagination.Item>
    <Pagination.Item>{7}</Pagination.Item>

    <Pagination.Item>
      <i className="modus-icons">more_horizontal</i>
    </Pagination.Item>
    <Pagination.Item>
      <i className="modus-icons">chevron_right</i>
    </Pagination.Item>
  </Pagination>
</nav>
`}
    >
      Use <code>&lt;Pagination&gt;</code> and{" "}
      <code>&lt;Pagination.Item&gt;</code> to wrap any custom paging items.
    </CodeBlock>

    <CodeBlock
      title="Disabled and active states"
      scope={{ Pagination }}
      code={`
<nav>
  <Pagination>
    <Pagination.Item disabled>Disabled</Pagination.Item>
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2 (active)</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>4</Pagination.Item>
  </Pagination>
</nav>
`}
    >
      Use prop like <code>active</code> and <code>disabled</code> to set the
      states. Disabled links appear un-clickable and Active to indicate the
      current page.
    </CodeBlock>

    <CodeBlock
      title="Sizing"
      scope={{ Pagination }}
      code={`
<div>
  <nav aria-label="...">
    <Pagination size="sm">
      <Pagination.Item disabled>Disabled</Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">chevron_left</i>
      </Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">more_horizontal</i>
      </Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item active>{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">more_horizontal</i>
      </Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">chevron_right</i>
      </Pagination.Item>
      <Pagination.Item>Next</Pagination.Item>
    </Pagination>
  </nav>

  <nav aria-label="...">
    <Pagination size="lg">
      <Pagination.Item disabled>Disabled</Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">chevron_left</i>
      </Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">more_horizontal</i>
      </Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item active>{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">more_horizontal</i>
      </Pagination.Item>
      <Pagination.Item>
        <i className="modus-icons">chevron_right</i>
      </Pagination.Item>
      <Pagination.Item>Next</Pagination.Item>
    </Pagination>
  </nav>
</div>
`}
    >
      Use <code>size</code> prop to set the size of all page items.
    </CodeBlock>

    <LinkedHeading h="2" id="pagination-api" className="h1">
      API
    </LinkedHeading>
    <ComponentApi metadata={props.data.Pagination} />
    <ComponentApi metadata={props.data.PageItem} />
  </MainLayout>
)

export default PaginationPage
export const query = graphql`
  query PaginationQuery {
    Pagination: componentMetadata(displayName: { eq: "Pagination" }) {
      ...ComponentApi_metadata
    }
    PageItem: componentMetadata(displayName: { eq: "PageItem" }) {
      ...ComponentApi_metadata
    }
  }
`
