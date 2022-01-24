import React, { createContext } from "react"
import { Column, HeaderGroup, TableInstance } from "react-table"
import { CustomTableInstance } from "./TableTypes"

export const TableContext = createContext<any>(null)

export const TableHeaderGroupsContext = createContext<Array<any>>(null)

export const TableHeadersContext = createContext<Array<any>>(null)
