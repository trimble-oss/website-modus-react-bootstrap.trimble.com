import React, { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { Container, Row } from "@trimbleinc/modus-react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import {
  ModusIconsScripts,
  ModusLayoutScripts,
} from "../common/ExternalDependencyHelper"
import styled from "styled-components"
import { range, inRange } from "lodash"

const POSITION = { x: 0, y: 0 }

const Draggable = ({ children, onDrag, onDragEnd, id }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  )

  const handleMouseDown = useCallback(event => {
    const { clientX, clientY } = event
    setState(prevState => ({
      ...prevState,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }))
  }, [])

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      }
      setState(prevState => ({
        ...prevState,
        translation,
      }))
      if (onDrag) onDrag({ translation, id })
    },
    [state.origin, onDrag, id]
  )

  const handleMouseUp = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isDragging: false,
    }))

    if (onDragEnd) onDragEnd()
  }, [onDragEnd])

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)

      setState(prevState => ({
        ...prevState,
        translation: POSITION,
      }))
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp])

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  )
}

const DraggableContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
`

const MAX = 5
const HEIGHT = 80

const App = props => {
  const items = range(MAX)
  const [state, setState] = useState({
    order: items,
    dragOrder: items,
    draggedIndex: null,
  })
  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT)
      const index = state.order.indexOf(id)
      const dragOrder = state.order.filter(index => index !== id)
      if (!inRange(index + delta, 0, items.length)) {
        return
      }
      dragOrder.splice(index + delta, 0, id)
      setState(state => ({
        ...state,
        draggedIndex: id,
        dragOrder,
      }))
    },
    [state.order, items.length]
  )
  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null,
    }))
  }, [])
  return (
    <DraggableContainer>
      {items.map(index => {
        const isDragging = state.draggedIndex === index
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10)
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10)
        return (
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect top={isDragging ? draggedTop : top} isDragging={isDragging}>
              {index}
            </Rect>
          </Draggable>
        )
      })}
    </DraggableContainer>
  )
}

const Rect = styled.div.attrs(props => ({
  style: {
    top: `${props.top}px`,
    transition: props.isDragging ? "none" : "all 500ms",
  },
}))`
  width: 300px;
  height: ${HEIGHT}px;
  user-select: none;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: calc(50vw-150px);
  font-size: 20px;
  color: #777;
`

// const SimpleDragDrop

const DragDropPage = props => {
  return (
    <DefaultLayout location={props.location}>
      <main id="main">
        <Container fluid className="pt-5">
          <Container>
            <Row>
              <div className="col-12 col-lg-6 pt-5 mt-xl-5">
                <h1 className=" mt-4 ">
                  <ModusIconsScripts />
                  <ModusLayoutScripts />
                  <App />
                </h1>
              </div>
            </Row>
          </Container>
        </Container>
      </main>
    </DefaultLayout>
  )
}

export default DragDropPage
