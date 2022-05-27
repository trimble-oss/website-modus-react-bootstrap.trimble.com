import { ReactNode } from "react"

export { default as TreeView } from "./TreeView"
export type { TreeViewProps } from "./TreeView"

export { default as TreeViewItem } from "./TreeViewItem"
export type { TreeViewItemProps } from "./TreeViewItem"

export type TreeItem = {
  id: number
  parentId: number
  index: number
  label?: ReactNode
  children?: TreeItem[]
  disabled?: boolean
}
