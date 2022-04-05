import { ReactNode } from "react"

export type TreeItem = {
  id: number
  parentId: number
  label?: React.ReactNode | React.ReactElement | string
  level?: number
  ref?: any
  children?: TreeItem[]
}
