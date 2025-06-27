import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, Register, Role } from './components/index.ts';
import NotFoundPage from './NotFoundPage.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "auth",
                children: [
                    {
                        path: "users",
                        element: <Register />,
                    },
                ]
            },
            {
                path: "access",
                children: [
                    {
                        path: "roles",
                        element: <Role />,
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
