import React from 'react'
import type { KanbanColumn, KanbanTask } from './KanbanBoard.types'
import { KanbanCard } from './KanbanCard'
import { Button } from '../primitives/Button'

interface KanbanColumnProps {
  column: KanbanColumn
  tasks: KanbanTask[]
  onAddTask: () => void
  onTaskClick: (task: KanbanTask) => void
  onCardDragStart: (task: KanbanTask) => (e: React.DragEvent<HTMLDivElement>) => void
  onCardDragEnd: () => void
  onDropTask: (taskIndex: number) => (e: React.DragEvent<HTMLDivElement>) => void
}

export const KanbanColumnView: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onAddTask,
  onTaskClick,
  onCardDragStart,
  onCardDragEnd,
  onDropTask
}) => {
  return (
    <section
      className="flex-shrink-0 w-72 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col max-h-[80vh]"
      role="region"
      aria-label={`${column.title} column. ${tasks.length} tasks.`}
    >
      <header className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-white rounded-t-2xl sticky top-0 z-10">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            {column.title}
          </h3>
          <p className="text-[11px] text-neutral-500">
            {tasks.length} tasks
            {column.maxTasks ? ` / ${column.maxTasks} max` : ''}
          </p>
        </div>
      </header>
      <div className="px-3 pt-3 pb-2 overflow-y-auto flex-1">
        {tasks.length === 0 && (
          <p className="text-xs text-neutral-500 italic mb-3">No tasks yet</p>
        )}
        {tasks.map((task, index) => (
          <div
            key={task.id}
            onDragOver={e => {
              e.preventDefault()
            }}
            onDrop={onDropTask(index)}
          >
            <KanbanCard
              task={task}
              onClick={() => onTaskClick(task)}
              onDragStart={onCardDragStart(task)}
              onDragEnd={onCardDragEnd}
            />
          </div>
        ))}
        <div
          onDragOver={e => {
            e.preventDefault()
          }}
          onDrop={onDropTask(tasks.length)}
        />
      </div>
      <footer className="p-3 border-t border-neutral-200 bg-white rounded-b-2xl">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={onAddTask}
          aria-label={`Add task to ${column.title}`}
        >
          + Add task
        </Button>
      </footer>
    </section>
  )
}
