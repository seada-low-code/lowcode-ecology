import React, { memo } from 'react'
import './index.less'

export interface IEventsSetterHeaderProps {
  title: string
}

export const EventsSetterHeader: React.FC<IEventsSetterHeaderProps> = memo(
  ({ title }) => {
    return (
      <div className="events-setter-header">
        <span className="events-setter-header__title">{title}</span>
      </div>
    )
  }
)
