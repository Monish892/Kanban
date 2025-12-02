import React, { useState } from 'react'
import type { KanbanViewProps, KanbanTask } from './KanbanBoard.types'
import { KanbanColumnView } from './KanbanColumn'
import { TaskModal } from './TaskModal'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { useKanbanBoardState } from '@/hooks/useKanbanBoard'

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns: initialColumns,
  tasks: initialTasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete
}) => {
  const { columns, tasks, moveTask, createTask, updateTask, deleteTask } =
    useKanbanBoardState(initialColumns, initialTasks)

  const drag = useDragAndDrop()
  const [activeTask, setActiveTask] = useState<KanbanTask | undefined>(undefined)
  const [modalColumnId, setModalColumnId] = useState<string | null>(null)

  const handleMove = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number
  ) => {
    moveTask(taskId, fromColumnId, toColumnId, newIndex)
    onTaskMove(taskId, fromColumnId, toColumnId, newIndex)
  }

  const handleCreate = (columnId: string, partial: Partial<KanbanTask>) => {
    const id = `task-${Date.now()}`
    const base: KanbanTask = {
      id,
      title: partial.title ?? 'New task',
      description: partial.description,
      status: columnId,
      priority: partial.priority,
      assignee: partial.assignee,
      tags: partial.tags ?? [],
      createdAt: new Date(),
      dueDate: partial.dueDate
    }
    createTask(columnId, base)
    onTaskCreate(columnId, base)
  }

  const handleUpdate = (taskId: string, updates: Partial<KanbanTask>) => {
    updateTask(taskId, updates)
    onTaskUpdate(taskId, updates)
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
    onTaskDelete(taskId)
  }

  const getColumnTasks = (columnId: string): KanbanTask[] => {
    const column = columns.find(col => col.id === columnId)
    if (!column) return []
    return column.taskIds
      .map(id => tasks[id])
      .filter((t): t is KanbanTask => Boolean(t))
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-full pb-4">
        {columns.map(column => (
          <KanbanColumnView
            key={column.id}
            column={column}
            tasks={getColumnTasks(column.id)}
            onAddTask={() => {
              setActiveTask(undefined)
              setModalColumnId(column.id)
            }}
            onTaskClick={task => {
              setActiveTask(task)
              setModalColumnId(column.id)
            }}
            onCardDragStart={task => e => {
              drag.startDragging(task.id, column.id)
              e.dataTransfer.effectAllowed = 'move'
            }}
            onCardDragEnd={drag.resetDrag}
            onDropTask={index => e => {
              e.preventDefault()
              if (!drag.draggedTaskId || !drag.sourceColumnId) return
              handleMove(drag.draggedTaskId, drag.sourceColumnId, column.id, index)
              drag.resetDrag()
            }}
          />
        ))}
      </div>
      <TaskModal
        open={modalColumnId !== null}
        columns={columns}
        task={activeTask}
        onClose={() => {
          setActiveTask(undefined)
          setModalColumnId(null)
        }}
        onSave={updates => {
          if (activeTask) {
            handleUpdate(activeTask.id, updates)
          } else if (modalColumnId) {
            handleCreate(modalColumnId, updates)
          }
          setActiveTask(undefined)
          setModalColumnId(null)
        }}
        onDelete={
          activeTask
            ? () => {
                handleDelete(activeTask.id)
                setActiveTask(undefined)
                setModalColumnId(null)
              }
            : undefined
        }
      />
    </div>
  )
}
