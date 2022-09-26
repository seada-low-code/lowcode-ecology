import React, { CSSProperties, useMemo, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { Spin } from 'antd'
import { createCodeSandbox, fixPreviewCode } from '../../helper'
import { Code, CodeSandboxParams } from '../../types'
import './index.less'
interface ICodeGenPreviewProps {
  height?: CSSProperties['height']
  code?: Code
}

interface IPreviewState {
  sandboxId?: string
  parameters?: CodeSandboxParams
  hasError?: boolean
  isCreating?: boolean
}

// codesandbox api可以参考：https://codesandbox.io/docs/api#get-request
const CodeGenPreview: React.FC<ICodeGenPreviewProps> = ({ code, height }) => {
  const [state, setState] = useState<IPreviewState>({})

  const parameters: CodeSandboxParams = useMemo(() => {
    // 返回codesandbox的参数，决定codesandbox里面的内容
    const files: CodeSandboxParams['files'] = {}
    if (code?.modules) {
      const fixedCode = code
      Object.values(fixedCode.modules).forEach((file) => {
        files[file.fpath.slice(1)] = {
          isBinary: false,
          content: file.code as string
        }
      })
      // 入口文件需要引入样式，先hard code好了
      // files['src/index.js'] = {
      //   isBinary: false,
      //   content: `\n// 目前需要单独引入样式文件\nimport "antd/dist/antd.css";\n// 引入入口文件\nimport \'./app\';\n`
      // }
    }
    return {
      files,
      template: 'umi4'
    }
  }, [code])

  useAsyncEffect(async () => {
    // 这里初始化codesandbox
    if (
      state.parameters !== parameters ||
      !state.sandboxId ||
      state.sandboxId === 'retry'
    ) {
      setState((prev) => {
        return {
          ...prev,
          hasError: false,
          parameters,
          isCreating: true
        }
      })
      const { sandbox_id: sandboxId } = await createCodeSandbox(parameters)
      setState({
        isCreating: false,
        sandboxId
      })
    }
  }, [])

  return (
    <div
      className="code-gen-preview"
      style={{ height }}
      data-code-sandbox-id={state.sandboxId}
    >
      {state.sandboxId ? (
        <iframe
          src={`https://codesandbox.io/embed/${state.sandboxId}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview`}
          title="CodeSandbox Preview"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="llow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spin tip="正在生成 CodeSandbox 预览应用" />
        </div>
      )}
    </div>
  )
}

export default CodeGenPreview
