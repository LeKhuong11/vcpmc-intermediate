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
import ConfigurationPage from "../page/SettingPage/ConfigurationPage/ConfigurationPage";
import ManagerContractPage from "../page/SettingPage/ManagerContractPage/ManagerContract";
import EditInformationPage from "../page/SettingPage/EditInformationPage/EditInformationPage";
import CycleForControlPage from "../page/SettingPage/CycleForControlPage/CycleForControlPage";
import UserManualPage from "../page/SupportPage/UserManualPage/UserManualPage";
import UpdateInformationPage from "../page/StorePage/UpdateInformationPage/UpdateInformationPage";
import DetailPlayListPage from "../page/PlaylistPage/DetailPlayListPage/DetailPlayListPage";
import AddNewPlaylistPage from "../page/PlaylistPage/AddNewPlaylistPage/AddNewPlaylistPage";
import AddNewSongPage from "../page/PlaylistPage/AddNewPlaylistPage/AddNewSongPage/AddNewSongPage";
import EditPlaylistPage from "../page/PlaylistPage/EditPlaylistPage/EditPlaylistPage";
import AddNewSongInEditPlaylistPage from "../page/PlaylistPage/EditPlaylistPage/AddNewSongPage/AddNewSongPageInEditPlaylist";
import DetailContractPage from "../page/ManagerPage/ManagerContract/AuthorizedContractTab/DetailContractPage/DetailContractPage";
import EditContractPage from "../page/ManagerPage/ManagerContract/AuthorizedContractTab/DetailContractPage/InforContractTab/EditContractPage/EditContractPage";
import AddContractPage from "../page/ManagerPage/ManagerContract/AddContractPage/AddContractPage";


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
                    path: 'store/update-infomation/:id',
                    element: <UpdateInformationPage />
                },
                {
                    path: 'play-list',
                    element: <PlayList />
                },
                {
                    path: 'play-list/detail/:id',
                    element: <DetailPlayListPage />
                },
                {
                    path: 'play-list/detail/:id/edit',
                    element: <EditPlaylistPage />
                },
                {
                    path: 'play-list/detail/:id/edit/add-new-song',
                    element: <AddNewSongInEditPlaylistPage />
                },
                {
                    path: 'play-list/add-new-playlist',
                    element: <AddNewPlaylistPage />
                    
                },
                {
                    path: 'play-list/add-new-playlist/add-new-song',
                    element: <AddNewSongPage />
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
                            path: 'contract/detail/:id',
                            element:<DetailContractPage />
                        },
                        {
                            path: 'contract/detail/:id/edit',
                            element:<EditContractPage />
                        },
                        {
                            path: 'contract/add-contract',
                            element:<AddContractPage />
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
                        },
                        {
                            path: 'configuration',
                            element: <ConfigurationPage />
                        },
                        {
                            path: 'manager-contract',
                            element: <ManagerContractPage />
                        },
                        {
                            path: 'edit-information',
                            element: <EditInformationPage />
                        },
                        {
                            path: 'cycle-for-control',
                            element: <CycleForControlPage />
                        }
                    ]
                },
                {
                    path: 'support',
                    children: [
                        {
                            path: 'user-manual',
                            element: <UserManualPage />
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
