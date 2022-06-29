import React, { CSSProperties } from 'react'

interface ICodeGenPreviewProps {
  height?: CSSProperties['height']
}

const CodeGenPreview: React.FC<ICodeGenPreviewProps> = ({ height }) => {
  return <div className="code-gen-preview" style={{ height }}></div>
}

export default CodeGenPreview
