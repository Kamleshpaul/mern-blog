import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import webRouter from './routes/web.route';
import adminRouter from './routes/admin.route';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { Toaster } from '@/components/ui/toaster';

const router = createBrowserRouter([...webRouter, ...adminRouter]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
