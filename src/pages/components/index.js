import React from "react"
import {
  Form,
  FormControl,
  Row,
  Col,
  Container,
} from "@trimbleinc/modus-react-bootstrap"
import { componentsMenu } from "../../common/MenuConfiguration"
import ComponentCard from "../../common/ComponentCard"
import Banner from "../../common/Banner"
import DefaultLayout from "../../layouts/DefaultLayout"

const ComponentsDashboard = props => {
  const { title, subtitle, path: parentMenu, children: menu } = componentsMenu

  return (
    <DefaultLayout location={props.location}>
      <Banner title={title} subtitle={subtitle}></Banner>
      <main id="main" className="my-5 container">
        <Container fluid className="mb-5">
          <Row>
            <Col>
              <Form className="w-100 mb-2">
                <FormControl
                  id="search"
                  type="text"
                  placeholder="Start typing to filter..."
                  className="w-100 search"
                  size="lg"
                />
              </Form>
            </Col>
          </Row>
          <Row className="list">
            {menu.map(item => (
              <div className="col-12 col-lg-6 col-xl-4 my-3" key={item.key}>
                <ComponentCard title={item.title} image={item.key}>
                  <p className="px-2 ml-n2">
                    <a
                      href={`${parentMenu}/${item.key}`}
                      className="stretched-link text-decoration-none text-muted"
                    >
                      {item.subtitle}
                    </a>
                  </p>
                </ComponentCard>
              </div>
            ))}
          </Row>
        </Container>
      </main>
    </DefaultLayout>
  )
}

export default ComponentsDashboard
