import { ReactNode } from "react"

export type TreeItem = {
  id: number
  parentId: number
  label?: React.ReactNode | React.ReactElement | string
  level?: number
  isDroppable?: boolean
  ref?: any
  children?: TreeItem[]
}
