import React, { useState, useRef, useEffect } from "react"
import {
  Form,
  FormControl,
  Nav,
  Overlay,
} from "@trimbleinc/modus-react-bootstrap"

const SearchBar = ({ location }) => {
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState()
  const [cursor, setCursor] = useState(-1)

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleChange = e => {
    let userInput = e.target.value
    setSearchQuery(userInput)

    if (userInput && userInput.length > 2 && window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(`*${userInput}*`)
        const pages = refs.map(({ ref }) => {
          return { itemRef: null, ...lunr.en.store[ref] }
        })
        setResults(pages)

        if (pages.length > 0) {
          setShow(true)
          setTarget(e.target)
        } else {
          setShow(false)
        }
      })
    } else setShow(false)
  }

  const handleKeyDown = e => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(prevState => prevState - 1)
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      setCursor(prevState => prevState + 1)
    } else if (e.keyCode === 13 && cursor > -1 && results[cursor].itemRef) {
      results[cursor].itemRef.focus()
      results[cursor].itemRef.click()
    }
  }
  return (
    <div ref={ref}>
      <Form inline className="ml-3 d-none d-md-inline-block">
        <Form.Group controlId="formSearch">
          <FormControl
            type="text"
            onChange={handleChange}
            placeholder="Search"
            className="mr-sm-2 w-100"
            value={searchQuery}
            onBlur={e => setShow(false)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
          />
          <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref.current}
            containerPadding={20}
            className="test"
          >
            {results.length > 0 && (
              <div
                className="autocomplete-suggestions"
                style={{ left: "1431px", top: "557px", width: "191px" }}
                as="div"
              >
                {results.map((page, index) => (
                  <Nav.Link
                    key={page.title}
                    className={`autocomplete-suggestion ${
                      cursor > -1 && index === cursor ? "selected" : ""
                    }`}
                    href={page.url}
                    tabIndex={index}
                    ref={e => (page.itemRef = e)}
                  >
                    » {page.title}
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
