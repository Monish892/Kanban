import React from 'react'
import type { KanbanTask } from './KanbanBoard.types'
import { Avatar } from '../primitives/Avatar'
import { formatDate, getPriorityColor, isOverdue } from '@/utils/task.utils'

interface KanbanCardProps {
  task: KanbanTask
  onClick: () => void
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
  onDragEnd: () => void
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  onClick,
  onDragStart,
  onDragEnd
}) => {
  const priorityClass = getPriorityColor(task.priority)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority ?? 'none'}. Press space to grab.`}
      className={`bg-white border border-neutral-200 rounded-xl p-3 shadow-card hover:shadow-card-hover transition-shadow cursor-grab active:cursor-grabbing mb-3 ${priorityClass}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">
          {task.title}
        </h4>
        {task.priority && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 capitalize">
            {task.priority}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-1">
        <div className="flex flex-wrap gap-1">
          {task.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {task.assignee && <Avatar name={task.assignee} />}
      </div>

      {task.dueDate && (
        <div
          className={`text-[11px] mt-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-neutral-500'}`}
        >
          Due: {formatDate(task.dueDate)}
        </div>
      )}
    </div>
  )
}
