import { ReactNode } from "react"

export type TreeItem = {
  id: number
  parentId: number
  label?: ReactNode
  children?: TreeItem[]
}
