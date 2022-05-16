import * as React from "react"
import { TreeItem } from "./types"

export interface TreeViewContextType {
  id: string
  checkBoxSelection?: boolean
  multiSelectNode?: boolean
  multiSelectCheckBox?: boolean
  collapseIcon?: React.ReactElement
  expandIcon?: React.ReactElement
  itemIcon?: React.ReactElement
  dragIcon?: React.ReactElement
  registerNode: (node: TreeItem) => void
  unRegisterNode: (nodeId: number) => void
  isExpanded: (nodeId: number) => boolean
  isNodeSelected: (nodeId: number) => boolean
  isIndeterminate: (nodeId: number) => boolean
  isCheckBoxSelected: (nodeId: number) => boolean
  toggleExpansion: (event: any, nodeId: number) => void
  toggleNodeSelection: (event: any, nodeId: number) => void
  toggleSingleCheckBoxSelection: (event: any, nodeId: number) => void
  toggleMultiCheckBoxSelection: (
    event: any,
    selected?: number[],
    unselected?: number[]
  ) => void
}

const TreeViewContext = React.createContext<TreeViewContextType>(null)

export default TreeViewContext