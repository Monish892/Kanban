import React from 'react'
import { getInitials } from '@/utils/task.utils'

interface AvatarProps {
  name: string
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <div
      className="w-7 h-7 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center"
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  )
}
