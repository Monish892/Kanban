import React from 'react'
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard'
import { sampleColumns, sampleTasks } from './components/KanbanBoard/sampleData'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Kanban Board Demo</h1>
      <KanbanBoard
        columns={sampleColumns}
        tasks={sampleTasks}
        onTaskMove={() => {}}
        onTaskCreate={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
      />
    </div>
  )
}
