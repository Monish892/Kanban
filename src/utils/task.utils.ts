import type { KanbanPriority } from '@/components/KanbanBoard/KanbanBoard.types'

export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const getPriorityColor = (priority: KanbanPriority | undefined): string => {
  if (!priority) return ''
  const colors: Record<KanbanPriority, string> = {
    low: 'bg-blue-50 text-blue-700 border-l-4 border-blue-400',
    medium: 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400',
    high: 'bg-orange-50 text-orange-700 border-l-4 border-orange-400',
    urgent: 'bg-red-50 text-red-700 border-l-4 border-red-400'
  }
  return colors[priority]
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString()
}

export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(tasks)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn)
  const destClone = Array.from(destColumn)
  const [removed] = sourceClone.splice(sourceIndex, 1)
  destClone.splice(destIndex, 0, removed)
  return {
    source: sourceClone,
    destination: destClone
  }
}
