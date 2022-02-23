export type TreeItem = {
  id: number
  parentId: number
  label: string
  children?: TreeItem[]
}
