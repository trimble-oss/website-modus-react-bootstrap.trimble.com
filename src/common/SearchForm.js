import React from "react"
import { navigate } from "gatsby"

const SearchForm = ({ query, handleChange }) => (
  <form role="search">
    <label htmlFor="search-input">
      <h1>Search posts</h1>
    </label>
    <input
      type="search"
      id="search-input"
      name="keywords"
      aria-controls="search-results-count"
      onChange={e => handleChange(e.target.value)}
      value={query}
    />
    <button type="submit">Submit</button>
  </form>
)

export default SearchForm
