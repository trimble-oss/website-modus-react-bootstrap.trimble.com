import { useState, useEffect, useRef, useContext } from "react"
import React from "react"
import { MenuContext } from "./MenuContext"

/**
 * This renders an item in the table of contents list.
 * scrollIntoView is used to ensure that when a user clicks on an item, it will smoothly scroll.
 */
const Headings = ({ headings, activeId }) => (
  <ul className="list-unstyled pl-0 ml-0">
    {headings.map(heading => (
      <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
        <a
          className="nav-link"
          href={`#${heading.id}`}
          onClick={e => {
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: "smooth",
            })
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="list-unstyled pl-0 ml-0">
            {heading.items.map(child => (
              <li
                key={child.id}
                className={child.id === activeId ? "active" : ""}
              >
                <a
                  className="nav-link"
                  href={`#${child.id}`}
                  onClick={e => {
                    document.querySelector(`#${child.id}`).scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
)

/**
 * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
 */
// const useHeadingsData = () => {
//   const [nestedHeadings, setNestedHeadings] = useState([]);

//   useEffect(() => {
//     const headingElements = Array.from(
//       document.querySelectorAll('main h2, main h3')
//     );

//     // Created a list of headings, with H3s nested
//     const newNestedHeadings = getNestedHeadings(headingElements);
//     setNestedHeadings(newNestedHeadings);
//   }, []);

//   return { nestedHeadings };
// };

const getNestedHeadings = headingElements => {
  const nestedHeadings = []

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading
    if (!id) return
    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] })
    } else if (heading.nodeName === "H3") {
      if (nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        })
      } else {
        nestedHeadings.push({ id, title, items: [] })
      }
    }
  })

  return nestedHeadings
}

const useIntersectionObserver = setActiveId => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    const callback = headings => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // Get all headings that are currently visible on the page
      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = id =>
        headingElements.findIndex(heading => heading.id === id)

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1
        )

        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector("iframe"),
      rootMargin: "500px",
    })

    const headingElements = Array.from(document.querySelectorAll("h2, h3"))

    headingElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

/**
 * Renders the table of contents.
 */
const TableOfContents = props => {
  const [activeId, setActiveId] = useState()
  const [nestedHeadings, setNestedHeadings] = useState([])
  const { current } = useContext(MenuContext)
  useIntersectionObserver(setActiveId)

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("main h2, main h3")
    )

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
  }, [props, setNestedHeadings])

  if (nestedHeadings && nestedHeadings.length > 0)
    return (
      <div className="sticky-top sticky-offset">
        <h5 className="pt-2 ml-3">On this page</h5>{" "}
        <nav id="TableOfContents" aria-label="Table of contents">
          <Headings headings={nestedHeadings} activeId={activeId} />
        </nav>
        {current.styleguideUrl && (
          <div>
            <h5 className="pt-2 ml-3">More Information</h5>
            <ul className="list-unstyled pl-0 ml-0">
              <li>
                <a
                  href={current.styleguideUrl}
                  className="nav-link text-dark text-decoration-none filter-desaturate"
                  target="_blank"
                  rel="noopener"
                >
                  Modus Style Guide
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    )

  return null
}
export default TableOfContents
