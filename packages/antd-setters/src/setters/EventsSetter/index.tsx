import React from 'react'

export interface IEventsSetterProps {
  value?: unknown
  onChange(value?: unknown): void
}

const EventsSetter: React.FC<IEventsSetterProps> = (props) => {
  return <div>hello world</div>
}

export default EventsSetter
