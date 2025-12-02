import type { Meta, StoryObj } from '@storybook/react'
import { KanbanBoard } from './KanbanBoard'
import { sampleColumns, sampleTasks } from './sampleData'
import type { KanbanColumn, KanbanTask } from './KanbanBoard.types'
import React from 'react'

const meta: Meta<typeof KanbanBoard> = {
  title: 'Kanban/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof KanbanBoard>

const Template = (args: React.ComponentProps<typeof KanbanBoard>) => (
  <div className="p-4 bg-neutral-50 min-h-[400px]">
    <KanbanBoard {...args} />
  </div>
)

export const Default: Story = {
  render: Template,
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {}
  }
}

export const Empty: Story = {
  render: Template,
  args: {
    columns: [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: [] }
    ],
    tasks: {},
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {}
  }
}

export const LargeDataset: Story = {
  render: Template,
  args: (() => {
    const columns: KanbanColumn[] = [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
      { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: [] }
    ]
    const tasks: Record<string, KanbanTask> = {}
    for (let i = 1; i <= 32; i++) {
      const id = `task-${i}`
      const status =
        i % 4 === 0 ? 'done' : i % 3 === 0 ? 'review' : i % 2 === 0 ? 'in-progress' : 'todo'
      const column = columns.find(c => c.id === status)!
      column.taskIds.push(id)
      tasks[id] = {
        id,
        title: `Task ${i}`,
        description: 'Sample task for performance testing',
        status,
        priority: (['low', 'medium', 'high', 'urgent'] as const)[i % 4],
        assignee: i % 2 === 0 ? 'John Doe' : 'Jane Smith',
        tags: ['perf', 'sample'],
        createdAt: new Date()
      }
    }
    return {
      columns,
      tasks,
      onTaskMove: () => {},
      onTaskCreate: () => {},
      onTaskUpdate: () => {},
      onTaskDelete: () => {}
    }
  })()
}

export const MobileView: Story = {
  render: args => (
    <div className="p-2 bg-neutral-50" style={{ maxWidth: 430 }}>
      <Template {...args} />
    </div>
  ),
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone14'
    }
  }
}

export const InteractivePlayground: Story = {
  render: Template,
  args: {
    ...Default.args
  },
  parameters: {
    controls: { expanded: true }
  }
}
