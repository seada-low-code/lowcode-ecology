import React from 'react'
import { Button } from 'antd'

const CodeGenBtn: React.FC = () => {
  const handleGenCode = () => {
    console.log('点击出码')
  }

  return <Button onClick={handleGenCode}>出码</Button>
}

export default CodeGenBtn
