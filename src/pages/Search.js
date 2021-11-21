import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import SearchForm from "../common/SearchForm"
import SearchResults from "../common/SearchResults"
import MainLayout from "../layouts/DefaultLayout"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"

const Search = ({ data, location }) => {
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState()

  useEffect(() => {
    if (searchQuery && window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(searchQuery)
        const posts = refs.map(({ ref }) => lunr.en.store[ref])
        setResults(posts)
      })
    }
  }, [searchQuery])

  const handleChange = search => setSearchQuery(search)

  return (
    <MainLayout location={location}>
      <main id="main">
        <Container fluid className="pt-5">
          <Container>
            <Row>
              <div className="col-12 col-lg-6 pt-5 mt-xl-5">
                <SearchForm query={searchQuery} handleChange={handleChange} />
                <SearchResults query={searchQuery} results={results} />
              </div>
            </Row>
          </Container>
        </Container>
      </main>
    </MainLayout>
  )
}

export default Search
