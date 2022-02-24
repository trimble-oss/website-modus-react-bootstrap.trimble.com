import * as React from "react"
import { TreeItem } from "./types"

export interface TreeViewContextType {
  registerNode: (node: TreeItem) => void
  unRegisterNode: (nodeId: number) => void
  isExpanded: (nodeId: number) => boolean
  isSelected: (nodeId: number) => boolean
  toggleExpansion: (event: any, nodeId: number) => void
  toggleSelection: (event: any, nodeId: number, multiple: boolean) => void
  multiSelect?: boolean
}

const TreeViewContext = React.createContext<TreeViewContextType>(null)

export default TreeViewContext
