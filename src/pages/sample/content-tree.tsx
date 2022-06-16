import React, { useState, useEffect, useCallback, useMemo, useRef } from "react"
import {
  Container,
  Form,
  Row,
  TreeView,
  TreeViewItem,
} from "@trimbleinc/modus-react-bootstrap"
import { ModusIconsScripts } from "../../common/ExternalDependencyHelper"
import "../../assets/css/main.scss"
import findIndex from "lodash/findIndex"
import useForceUpdate from "@restart/hooks/useForceUpdate"
import { createPortal } from "react-dom"
import classNames from "classnames"
import styled from "styled-components"

const ContentTreePage = props => {
  return (
    <main id="main">
      <Container fluid className="pt-5">
        <Container>
          <Row>
            <div className="col-12 col-lg-6 pt-5 mt-xl-5">
              <ModusIconsScripts />
              <div style={{ width: "400px" }}>
                <TreeView nodeId={0} id="test">
                  <TreeViewItem nodeId={7} label="Inbox">
                    <TreeViewItem nodeId={8} label="Personal"></TreeViewItem>
                    <TreeViewItem nodeId={9} label="Work"></TreeViewItem>
                    <TreeViewItem nodeId={10} label="Community"></TreeViewItem>
                    <TreeViewItem nodeId={11} label="Social"></TreeViewItem>
                    <TreeViewItem nodeId={12} label="Friends"></TreeViewItem>
                    <TreeViewItem nodeId={14} label="More ..."></TreeViewItem>
                  </TreeViewItem>
                  <TreeViewItem nodeId={15} label="Sent">
                    <TreeViewItem nodeId={16} label="Mail1"></TreeViewItem>
                    <TreeViewItem nodeId={17} label="Mail2"></TreeViewItem>
                    <TreeViewItem nodeId={18} label="Mail3"></TreeViewItem>
                  </TreeViewItem>
                  <TreeViewItem nodeId={1} label="Archived">
                    <TreeViewItem nodeId={2} label="Folder1">
                      <TreeViewItem nodeId={3} label="File1"></TreeViewItem>
                      <TreeViewItem nodeId={4} label="Folder2">
                        <TreeViewItem nodeId={5} label="File2"></TreeViewItem>
                      </TreeViewItem>
                      <TreeViewItem nodeId={6} label="File3"></TreeViewItem>
                    </TreeViewItem>
                  </TreeViewItem>
                  <TreeViewItem nodeId={19} label="Spam"></TreeViewItem>
                </TreeView>
              </div>
            </div>
          </Row>
        </Container>
      </Container>
    </main>
  )
}

export default ContentTreePage
