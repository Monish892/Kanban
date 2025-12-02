import { useState, useCallback } from 'react'

interface DragState {
  isDragging: boolean;
  draggedTaskId: string | null;
  sourceColumnId: string | null;
  overColumnId: string | null;
  overIndex: number | null;
}

export const useDragAndDrop = () => {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    draggedTaskId: null,
    sourceColumnId: null,
    overColumnId: null,
    overIndex: null
  })

  const startDragging = useCallback((taskId: string, columnId: string) => {
    setState(prev => ({
      ...prev,
      isDragging: true,
      draggedTaskId: taskId,
      sourceColumnId: columnId
    }))
  }, [])

  const updateOver = useCallback((columnId: string, index: number) => {
    setState(prev => ({
      ...prev,
      overColumnId: columnId,
      overIndex: index
    }))
  }, [])

  const resetDrag = useCallback(() => {
    setState({
      isDragging: false,
      draggedTaskId: null,
      sourceColumnId: null,
      overColumnId: null,
      overIndex: null
    })
  }, [])

  return {
    ...state,
    startDragging,
    updateOver,
    resetDrag
  }
}
