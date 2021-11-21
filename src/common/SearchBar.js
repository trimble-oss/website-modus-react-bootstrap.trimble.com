import React, { useState, useEffect } from "react"
import { Dropdown, Form, FormControl } from "@trimbleinc/modus-react-bootstrap"
import classNames from "classnames"

const SearchBar = props => {
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState()

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2 && window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(`*${searchQuery}*`)
        const posts = refs.map(({ ref }) => lunr.en.store[ref])
        setResults(posts)
      })
    }
  }, [searchQuery])

  const handleChange = e => setSearchQuery(e.target.value)

  const CustomToggle = React.forwardRef(({ className }, ref) => (
    <FormControl
      ref={ref}
      type="text"
      onChange={handleChange}
      placeholder="Search"
      className="mr-sm-2"
      value={searchQuery}
      autoFocus={true}
    />
  ))

  return (
    <Form inline>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          as={CustomToggle}
        ></Dropdown.Toggle>
        <Dropdown.Menu show={results.length > 0} className="dropdown-menu-sm">
          {results.map(({ title, url, description }) => (
            <Dropdown.Item eventKey={title} key={title}>
              {title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  )
}

export default SearchBar
