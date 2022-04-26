import { ReactNode } from "react"

export type TreeItem = {
  id: number
  parentId: number
  index: number
  label?: ReactNode
  children?: TreeItem[]
  disabled?: boolean
}
export type TreeItemExtended = TreeItem & {
  element?: any
}
