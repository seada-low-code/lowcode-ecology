import React, { CSSProperties, useEffect, useMemo } from 'react'
import { Code } from '../CodeGenResult'

interface ICodeGenPreviewProps {
  height?: CSSProperties['height']
  code?: Code
}

const CodeGenPreview: React.FC<ICodeGenPreviewProps> = ({ code, height }) => {
  const parameters = useMemo(() => {
    // TODO: 返回codesandbox的参数
    return null
  }, [])
  useEffect(() => {
    // 这里初始化codesandbox
  }, [])

  return <div className="code-gen-preview" style={{ height }}></div>
}

export default CodeGenPreview
