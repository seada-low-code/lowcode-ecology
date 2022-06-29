import React, { useMemo, useState } from 'react'
import naturalCompare from 'string-natural-compare'
import Editor from '@alilc/lowcode-plugin-base-monaco-editor'
import '@alilc/lowcode-plugin-base-monaco-editor/lib/style'
import { Tree } from 'antd'
import { DataNode, TreeProps } from 'antd/lib/tree'
import { Code } from '../CodeGenResult'
import './index.less'

interface ISourceViewProps {
  code?: Code
}

const SourceView: React.FC<ISourceViewProps> = ({ code }) => {
  const [state, setState] = useState(() => {
    const allFiles = Object.values(code?.modules)
    const currentFile = [
      allFiles.find((val) => /pages.+(js|ts)x?$/.test(val.fpath)),
      allFiles.find((val) => val.entry)
    ].filter(Boolean)[0]
    return {
      currentFile,
      selectedKeys: currentFile?.fpath ? [currentFile.fpath] : undefined
    }
  })

  const addFileToNodes = (
    currentNodes: DataNode[],
    basePath: string,
    path: string,
    file: any
  ) => {
    const pathArr = path.split('/').filter(Boolean)
    const head = pathArr[0]
    const tail = pathArr.slice(1)
    if (!tail.length) {
      currentNodes.push({
        title: head,
        key: file.fpath,
        children: [],
        icon: null // TODO: 后续再把这个icon加上吧
      })
    } else {
      let parentNode = currentNodes.find((node) => node.title === head)
      if (!parentNode) {
        parentNode = {
          title: head,
          key: `${basePath}/${head}`,
          children: [],
          icon: null
        }
        currentNodes.push(parentNode)
      }
      parentNode.children = parentNode.children || []
      addFileToNodes(
        parentNode.children,
        `${basePath}/${head}`,
        tail.join('/'),
        file
      )
    }
  }

  // 对节点排序
  const sortNodes = (nodes: DataNode[]) => {
    return nodes
      .sort((aNode, bNode) => {
        const aChildren = aNode.children
        const bChildren = bNode.children
        if (
          Array.isArray(aChildren) &&
          aChildren.length &&
          !(Array.isArray(bChildren) && bChildren.length)
        ) {
          // 将a节点放到b节点之前
          return -1
        }
        if (
          Array.isArray(bChildren) &&
          bChildren.length &&
          !(Array.isArray(aChildren) && aChildren.length)
        ) {
          // 将b节点放到a节点之前
          return 1
        }
        return naturalCompare(aNode.title, bNode.title)
      })
      .map((node) => {
        if (Array.isArray(node?.children) && node.children.length) {
          node.children = sortNodes(node.children)
        }
        return node
      })
  }

  const fileTreeNodes: DataNode[] = useMemo(() => {
    const files = Object.values(code.modules)
    const rootNodes: DataNode[] = []
    files.forEach((file) => addFileToNodes(rootNodes, '/', file.fpath, file))
    return sortNodes(rootNodes)
  }, [code])

  const defaultExpandedKeys = useMemo(() => {
    return Array.from(
      new Set(
        [].concat(
          fileTreeNodes
            .filter(
              (node) => Array.isArray(node?.children) && node.children.length
            )
            .map((node) => node.key),
          state.selectedKeys,
          ['src', 'src/pages']
        )
      ).values()
    )
  }, [fileTreeNodes, state.selectedKeys])

  const handleSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected:', selectedKeys, info)
  }

  return (
    <div className="code-gen-sources-view">
      <div className="tree-pane">
        <Tree treeData={fileTreeNodes} onSelect={handleSelect} />
      </div>
      <div className="source-code-pane">
        <Editor />
      </div>
    </div>
  )
}

export default SourceView
