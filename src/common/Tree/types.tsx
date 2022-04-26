import { ReactNode } from "react"

export type TreeItem = {
  id: number
  parentId: number
  label?: ReactNode
  children?: TreeItem[]
  disabled?: boolean
}
export type TreeItemExtended = TreeItem & {
  index: number
  element?: any
}
