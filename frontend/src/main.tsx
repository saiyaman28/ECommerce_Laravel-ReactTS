import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ContextProvider} from './context_provider'
import router from './router'
import './assets/styles/base.sass'
import './assets/bootstrap/bootstrap.css'
import './assets/bootstrap/bootstrap.js'
import './assets/bootstrap/popper.js'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error("Root element not found")
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
)
