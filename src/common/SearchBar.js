import React, { useState, useEffect, useRef } from "react"
import {
  Dropdown,
  Form,
  FormControl,
  ListGroup,
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
  const dropdownRef = useRef(null)

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target))
      setShow(false)
  }

  document.addEventListener("mousedown", handleClickOutside)

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FormControl
      type="text"
      onChange={handleChange}
      placeholder="Search"
      className="mr-sm-2 w-100"
      value={searchQuery}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="off"
      ref={ref}
      autoFocus={true}
      onClick={e => {
        e.preventDefault()
      }}
    />
  ))

  return (
    <div ref={ref}>
      <Form inline className="ml-3 d-none d-md-inline-block">
        <Form.Group controlId="formSearch">
          <Dropdown className="w-100">
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>
            <Dropdown.Menu
              show={show}
              ref={dropdownRef}
              className={`w-100 autocomplete-suggestions ${show && "show"}`}
            >
              {results.map((page, index) => (
                <Dropdown.Item
                  active={cursor > -1 && index === cursor}
                  eventKey={page.title}
                  key={page.title}
                  href={page.url}
                  className="autocomplete-suggestion"
                >
                  » {page.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchBar
