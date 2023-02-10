import { useRoutes } from "react-router-dom";
import CreateList from "../page/CreateListPage/CreateList";
import Dashboard from "../page/DashboardPage/Dashboard";
import PlayList from "../page/PlaylistPage/PlayList";
import ManagerContract from "../page/ManagerPage/ManagerContract/ManagerContract";
import ManagerDevice from "../page/ManagerPage/ManagerDevice/ManagerDevice";
import Store from "../page/StorePage/Store";
import ManagerPage from "../page/ManagerPage/ManagerPage";
import Authorized from "../page/ManagerPage/AuthorizedPartner/Authorized";
import Login from "../page/LoginPage/Login";
import HomePage from "../page/HomePage/HomePage";
import UnitUsedPage from "../page/ManagerPage/UnitUsed/UnitUsedPage";
import RevenuePage from "../page/RevenuePage/RevenuePage";
import RevenueDistributionPage from "../page/RevenuePage/RevenueDistributionPage/RevenueDistributionPage";
import HistoryForControlPage from "../page/RevenuePage/HistoryForControlPage/HistoryForControlPage";
import SettingPage from "../page/SettingPage/SettingPage";
import AuthenticationPage from "../page/SettingPage/AuthenticationPage/AuthenticationPage";


export function Router() {
    let element = useRoutes([
        {
            path: 'login',
            element: <Login />
        },
        {
            path: '/',
            element: <HomePage />,
            children: [
                {
                    path: 'store',
                    element: <Store />
                },
                {
                    path: 'play-list',
                    element: <PlayList />
                },
                {
                    path: 'create-list',
                    element: <CreateList />
                },
                {
                    path: 'manager',
                    element: <ManagerPage />,
                    children: [
                        {
                            path: 'contract',
                            element:<ManagerContract />
                        },
                        {
                            path: 'device',
                            element: <ManagerDevice />
                        },
                        {
                            path: 'authorized-partner',
                            element: <Authorized />
                        },
                        {
                            path: 'unit-used',
                            element: <UnitUsedPage />
                        }
                    ]
                },
                {
                    path: 'revenue',
                    element: <RevenuePage />,
                    children: [
                        {
                            path: 'history-for-control',
                            element: <HistoryForControlPage />
                        },
                        {
                            path: 'revenue-distribution',
                            element: <RevenueDistributionPage />
                        },
                    ]
                },
                {
                    path: 'setting',
                    element: <SettingPage />,
                    children: [
                        {
                            path: 'authentication',
                            element: <AuthenticationPage />
                        }
                    ]
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />
                }
            ]
        },
    ])

    return element
}
