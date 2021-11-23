export const PaginationBasic = `
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
`

export const PaginationDisabledActiveStates = `
<nav>
  <Pagination>
    <Pagination.Item disabled>Disabled</Pagination.Item>
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item active>2 (active)</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Item>4</Pagination.Item>
  </Pagination>
</nav>
`

export const PaginationSizing = `
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
`
