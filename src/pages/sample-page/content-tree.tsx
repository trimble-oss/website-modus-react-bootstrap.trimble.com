/* eslint-disable */
// @ts-nocheck

/**
 * Sample page to test accessibility and performance
 */

import * as React from "react"

import {
  TreeViewBasic,
  TreeViewBorderless,
  TreeViewCondensed,
  TreeViewMultiSelect,
  TreeViewWithItemIcon,
  TreeViewWithActionBar,
  TreeViewWithFilter,
  StyledIcon,
  StyledDragItem,
  StyledCustomTreeViewItem,
  TreeViewWithDragDrop,
} from "../../examples/components/ContentTree"
import findIndex from "lodash/findIndex"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { createPortal } from "react-dom"
import classNames from "classnames"
import Layout from "../../common/sample-page/Layout"
import CodeBlock from "../../common/sample-page/SampleCodeBlock"

export default function ContentTreePage(props: any) {
  return (
    <Layout title="Content Tree" {...props}>
      <>
        <CodeBlock title="Basic" code={TreeViewBasic} />

        <CodeBlock
          title="Tree with Icons"
          hideCode={true}
          code={TreeViewWithItemIcon}
          noInline={true}
        />

        <CodeBlock
          title="Condensed Tree"
          hideCode={true}
          code={TreeViewCondensed}
        />

        <CodeBlock
          title="Borderless Tree"
          hideCode={true}
          code={TreeViewBorderless}
        />

        <CodeBlock
          title="Multi Selection Tree"
          hideCode={true}
          code={TreeViewMultiSelect}
        />

        <CodeBlock
          title="Tree with Actions"
          code={TreeViewWithActionBar}
          scope={{ StyledIcon, findIndex, useForceUpdate }}
          noInline={true}
          hideCode={true}
        />

        <CodeBlock
          title="Tree with Filter"
          code={TreeViewWithFilter}
          scope={{ StyledIcon, findIndex, useForceUpdate }}
          noInline={true}
          hideCode={true}
        />

        <CodeBlock
          title="Tree with Drag and Drop"
          code={TreeViewWithDragDrop}
          scope={{
            StyledIcon,
            useForceUpdate,
            StyledDragItem,
            StyledCustomTreeViewItem,
            createPortal,
            classNames,
            findIndex,
          }}
          noInline={true}
          hideCode={true}
        />

        <CodeBlock
          title="Accessibility"
          code={TreeViewWithDragDrop}
          scope={{
            StyledIcon,
            useForceUpdate,
            StyledDragItem,
            StyledCustomTreeViewItem,
            createPortal,
            classNames,
            findIndex,
          }}
          noInline={true}
          hideCode={true}
        />
      </>
    </Layout>
  )
}
