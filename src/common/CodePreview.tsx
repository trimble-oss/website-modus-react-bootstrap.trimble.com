import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import theme from "prism-react-renderer/themes/github"
import { Container } from "@trimbleinc/modus-react-bootstrap"
import React, { useContext, useEffect, useRef, useState } from "react"
import * as ReactBootstrap from "@trimbleinc/modus-react-bootstrap"
import ReactDOM from "react-dom"
import {
  TableHead,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
  Table,
  TableContainer,
  TablePagination,
  DataTable,
} from "../common/Table"

const CodePreview = props => {
  const scope = {
    useEffect,
    useRef,
    useState,
    useContext,
    ...ReactBootstrap,
    ReactDOM,
    ...props.scope,
    TableHead,
    TableBody,
    TableCell,
    TableHeaderCell,
    TableRow,
    Table,
    TableContainer,
    TablePagination,
    DataTable,
  }

  return (
    <div className="guide-example-block">
      <LiveProvider
        noInline={props.noInline}
        code={props.code}
        scope={scope}
        theme={theme}
      >
        <Container
          className={`guide-example-block shadow-sm`}
          style={{ padding: "1rem", margin: "auto", ...props.style }}
        >
          <LivePreview className={props.className} />
        </Container>
        <div className="border-top border-gray-200">
          <LiveEditor />
        </div>
        <LiveError />
      </LiveProvider>
    </div>
  )
}

export default CodePreview
