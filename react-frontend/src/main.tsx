import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage'
import './index.css'
import Dashboard from './pages/TasksForm'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> }, { path: '/dashboard', element: <Dashboard /> }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
