import { useState, useCallback } from 'react'
import type { KanbanColumn, KanbanTask } from '@/components/KanbanBoard/KanbanBoard.types'
import { moveTaskBetweenColumns, reorderTasks } from '@/utils/task.utils'

export const useKanbanBoardState = (
  initialColumns: KanbanColumn[],
  initialTasks: Record<string, KanbanTask>
) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks)

  const moveTask = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
      setColumns(prev => {
        const next = prev.map(col => ({ ...col }))
        const source = next.find(c => c.id === fromColumnId)
        const dest = next.find(c => c.id === toColumnId)
        if (!source || !dest) return prev

        const sourceIndex = source.taskIds.indexOf(taskId)
        if (sourceIndex === -1) return prev

        if (fromColumnId === toColumnId) {
          source.taskIds = reorderTasks(source.taskIds, sourceIndex, newIndex)
        } else {
          const moved = moveTaskBetweenColumns(source.taskIds, dest.taskIds, sourceIndex, newIndex)
          source.taskIds = moved.source
          dest.taskIds = moved.destination
        }

        setTasks(prevTasks => ({
          ...prevTasks,
          [taskId]: {
            ...prevTasks[taskId],
            status: toColumnId
          }
        }))

        return next
      })
    },
    []
  )

  const createTask = useCallback((columnId: string, task: KanbanTask) => {
    setTasks(prev => ({
      ...prev,
      [task.id]: task
    }))
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, taskIds: [task.id, ...col.taskIds] } : col
      )
    )
  }, [])

  const updateTask = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        ...updates
      }
    }))
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const next = { ...prev }
      delete next[taskId]
      return next
    })
    setColumns(prev =>
      prev.map(col => ({
        ...col,
        taskIds: col.taskIds.filter(id => id !== taskId)
      }))
    )
  }, [])

  return {
    columns,
    tasks,
    moveTask,
    createTask,
    updateTask,
    deleteTask
  }
}
