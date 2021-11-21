import React, { useState, useRef } from "react"
import {
  Form,
  FormControl,
  Nav,
  Overlay,
} from "@trimbleinc/modus-react-bootstrap"

const SearchBar = props => {
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState()

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleChange = e => {
    let userInput = e.target.value
    setSearchQuery(userInput)

    if (userInput && userInput.length > 2 && window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(`*${userInput}*`)
        const posts = refs.map(({ ref }) => lunr.en.store[ref])
        setResults(posts)

        if (posts.length > 0) {
          setShow(true)
          setTarget(e.target)
        } else {
          setShow(false)
        }
      })
    } else setShow(false)
  }

  return (
    <div ref={ref}>
      <Form inline className="ml-3 d-none d-md-inline-block">
        <Form.Group controlId="formSearch">
          <FormControl
            ref={ref}
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="mr-sm-2 w-100"
            value={searchQuery}
            onBlur={e => setShow(false)}
          />
          <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref.current}
            containerPadding={20}
          >
            {results.length > 0 && (
              <div
                className="autocomplete-suggestions"
                style={{ left: "1431px", top: "557px", width: "191px" }}
                as="div"
              >
                {results.map(({ title, url, description }) => (
                  <Nav.Link
                    key={title}
                    className="autocomplete-suggestion"
                    href={url}
                  >
                    » {title}
                  </Nav.Link>
                ))}
              </div>
            )}
          </Overlay>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchBar
