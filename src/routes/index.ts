import CreateList from "../page/CreateListPage/CreateList";
import Dashboard from "../page/DashboardPage/Dashboard";
import PlayList from "../page/PlaylistPage/PlayList";
import ManagerContract from "../page/ManagerPage/ManagerContract/ManagerContract";
import ManagerDevice from "../page/ManagerPage/ManagerDevice/ManagerDevice";
import Store from "../page/StorePage/Store";


export const publicRoutes = [
    {
        path: 'store',
        component: Store 
    },
    {
        path: 'play-list',
        component: PlayList
    },
    {
        path: 'create-list',
        component: CreateList
    },
    {
        path: 'manager/contract',
        component: ManagerContract
    },
    {
        path: 'manager/device',
        component: ManagerDevice
    },
    {
        path: 'dashboard',
        component: Dashboard
    }
]