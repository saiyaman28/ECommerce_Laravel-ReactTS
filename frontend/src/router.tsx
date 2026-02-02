import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './Layout/Guest'
import IndexPage from './Pages/index'

export default createBrowserRouter([

    {
        path: '',
        element: <GuestLayout/>,
        children: [
            {
                path: '',
                element: <IndexPage/>
            },
        ]
    }
])

