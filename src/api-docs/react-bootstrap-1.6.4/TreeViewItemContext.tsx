import * as React from "react"
import { TreeItem } from "./types"

const TreeViewItemContext =
  React.createContext<{ parentId: number | null; level: number }>(null)

export default TreeViewItemContext
