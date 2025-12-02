# Kanban Board Component

## Live Storybook

https://692eabfb1db921dc8ef17794-lpddkwuqyw.chromatic.com/

## Installation

```bash
npm install
npm run storybook
```

## Architecture

This project implements a reusable Kanban Board component in React + TypeScript with Tailwind CSS.
The board is driven by a `columns` array and `tasks` record, and exposes callbacks for moving,
creating, updating and deleting tasks. State for the demo stories is handled via a `useKanbanBoardState`
hook while drag-and-drop is implemented using the native HTML5 drag API and a small `useDragAndDrop` hook.

## Features

- [x] Drag-and-drop tasks between columns
- [x] Task creation / editing modal
- [x] Responsive horizontal scrolling layout
- [x] Keyboard accessible cards and modal
- [x] Storybook stories for key states

## Storybook Stories

- Default board
- Empty state
- Large dataset
- Mobile view
- Interactive playground

## Technologies

- React + TypeScript
- Tailwind CSS
- Vite
- Storybook

