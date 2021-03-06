import React from "react"
import * as PropTypes from "prop-types"
import { Card } from "@trimbleinc/modus-react-bootstrap"

const propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
}

const ComponentCard = ({ title, image, ...props }) => {
  const cardImg = require(`../assets/img/components/${image}.png`)
  return (
    <Card
      key={props.key}
      className="card-blog-brief h-100 border bg-light shadow-sm"
    >
      {/* <Card.Header
        className="top-rounded mb-0 pb-0 border-0"
        style={{ backgroundImage: url({ titleBackground }) }}
      ></Card.Header> */}
      <Card.Img variant="top" src={cardImg.default} />
      <Card.Body className="bg-white">
        <Card.Title as="h3" className="px-2 ml-n2 name">
          {title}
        </Card.Title>
        {props.children}
      </Card.Body>
    </Card>
  )
}

ComponentCard.propTypes = propTypes

export default ComponentCard
