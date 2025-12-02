import type { KanbanColumn } from '@/components/KanbanBoard/KanbanBoard.types'

export const findColumnByTaskId = (
  columns: KanbanColumn[],
  taskId: string
): KanbanColumn | undefined => {
  return columns.find(col => col.taskIds.includes(taskId))
}
