import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from "./Context_Provider";
import router from './router'
import './Assets/CSS/Base.sass'
import './Assets/Bootstrap/Bootstrap.css'
import './Assets/Bootstrap/Bootstrap.js'
import './Assets/Bootstrap/Popper.js'

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
