import { createBrowserRouter, Route } from 'react-router-dom';
import { Action, ListOrganization, LoginPage, Module, Permission, Register, Role, RolePermission, RoutePermission, UserPermission } from './components/index.ts';
import NotFoundPage from './NotFoundPage.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import Routes from './components/authorization/Routes.tsx';
import CreateOrganization from './components/Master/CreateOrganization.tsx';

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
                    },
                    {
                        path: "modules",
                        element: <Module />,
                    },
                    {
                        path: "actions",
                        element: <Action />,
                    },
                    {
                        path: "permissions",
                        element: <Permission />,
                    },
                    {
                        path: "role-permissions",
                        element: <RolePermission />,
                    },
                    {
                        path: "user-permissions",
                        element: <UserPermission />,
                    },
                    {
                        path: "route-permissions",
                        element: <RoutePermission />,
                    },
                    {
                        path: "routes",
                        element: <Routes />,
                    }
                ]
            },
            {
                path: "create",
                children: [
                    {
                        path: "organization",
                        element: <CreateOrganization />,
                    },
                ]
            },
            {
                path: "list",
                children: [
                    {
                        path: "organizations",
                        element: <ListOrganization />,
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
