import ReactRenderer from '@alilc/lowcode-react-renderer'
import React, { useRef } from 'react'
import Frame from 'react-frame-component'

const PreviewFrame: React.FC = () => {
  const iframeRef = useRef(null)

  // 获取ReactRenderer的参数
  return (
    <Frame ref={iframeRef}>
      <ReactRenderer />
    </Frame>
  )
}

export default PreviewFrame
