import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './Layout/Guest'
import IndexPage from './Pages/index'
import LoginPage from './Pages/login'

export default createBrowserRouter([

    {
        path: '',
        element: <GuestLayout/>,
        children: [
            {
                path: '',
                element: <IndexPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
        ]
    }
])

