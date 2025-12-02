import React, { useState } from 'react'
import type { KanbanColumn, KanbanTask, KanbanPriority } from './KanbanBoard.types'
import { Modal } from '../primitives/Modal'
import { Button } from '../primitives/Button'

interface TaskModalProps {
  open: boolean
  columns: KanbanColumn[]
  task?: KanbanTask
  onClose: () => void
  onSave: (updates: Partial<KanbanTask>) => void
  onDelete?: () => void
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  columns,
  task,
  onClose,
  onSave,
  onDelete
}) => {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState(task?.status ?? columns[0]?.id)
  const [priority, setPriority] = useState<KanbanPriority | undefined>(task?.priority)
  const [assignee, setAssignee] = useState(task?.assignee ?? '')

  React.useEffect(() => {
    setTitle(task?.title ?? '')
    setDescription(task?.description ?? '')
    setStatus(task?.status ?? columns[0]?.id)
    setPriority(task?.priority)
    setAssignee(task?.assignee ?? '')
  }, [task, columns])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      status,
      priority,
      assignee
    })
  }

  return (
    <Modal open={open} title={task ? 'Edit Task' : 'Create Task'} onClose={onClose}>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block">Title</span>
          <input
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block">Description</span>
          <textarea
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block">Status</span>
            <select
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {columns.map(col => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block">Priority</span>
            <select
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              value={priority ?? ''}
              onChange={e =>
                setPriority((e.target.value || undefined) as KanbanPriority | undefined)
              }
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block">Assignee</span>
          <input
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
          />
        </label>
        <div className="flex justify-between pt-2">
          {onDelete && task && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-error-700"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
          <div className="ml-auto flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
