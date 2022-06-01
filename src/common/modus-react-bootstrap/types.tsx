import { ReactNode } from "react"

export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | string
export type ButtonVariant =
  | Variant
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-dark"
  | "outline-light"
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "white"
  | "muted"

export type EventKey = string | number

export type ContextMenuState = {
  positionX: string | number
  positionY: string | number
  items: ContextMenuItem[]
}
export type ContextMenuItem = {
  title: React.ReactNode
  onClick?: (...args: any) => void
  children?: ContextMenuItem[]
}
export type TreeItem = {
  id: number
  parentId: number
  index: number
  label?: ReactNode
  children?: TreeItem[]
  disabled?: boolean
  element?: any
}
