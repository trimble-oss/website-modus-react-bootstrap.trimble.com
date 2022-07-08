import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  createContext,
} from "react"
import ReactDOM from "react-dom"
import * as ReactBootstrap from "@trimbleinc/modus-react-bootstrap"
import { LiveProvider, LivePreview } from "react-live"

const SampleCodeBlock = ({ title, ...props }) => {
  const scope = {
    ReactDOM,
    useEffect,
    useRef,
    useState,
    useContext,
    useCallback,
    createContext,
    useMemo,
    ...ReactBootstrap,
    ...props.scope,
  }
  return (
    <div className="grid-item bg-white">
      <h3 id={`title-${title.replace(" ", "")}`}>{title}</h3>
      <LiveProvider noInline={props.noInline} code={props.code} scope={scope}>
        <LivePreview className={props.className} />
      </LiveProvider>
    </div>
  )
}

export default SampleCodeBlock
