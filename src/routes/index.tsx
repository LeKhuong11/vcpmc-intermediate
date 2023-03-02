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
import DetailMiningContract from "../page/ManagerPage/ManagerContract/MiningContractTab/DetailMiningContractPage/DetailMiningContractPage";
import AddDevicePage from "../page/ManagerPage/ManagerDevice/AddDevicePage/AddDevicePage";
import ResetPasswordPage from "../page/LoginPage/ResetPasswordPage/ResetPasswordPage";
import DetailCreateListPage from "../page/CreateListPage/DetailCreateListPage/DetailCreateListPage";
import DetailAuthorizedPartnerPage from "../page/ManagerPage/AuthorizedPartner/DetailAuthorizedPartnerPage/DetailAuthorizedPartnerPage";
import DetailUnitUsedPage from "../page/ManagerPage/UnitUsed/DetailUnitUsed/DetailUnitUsedPage";
import DetailUserPage from "../page/ManagerPage/UnitUsed/DetailUnitUsed/DetailUserPage/DetailUserPage";
import UpdateUserPage from "../page/ManagerPage/UnitUsed/DetailUnitUsed/DetailUserPage/UpdateUserPage/UpdateUserPage";
import EditInforUserPage from "../page/SettingPage/AuthenticationPage/EditInforUserPage/EditInforUserPage";
import AddUserPageUnitUsed from "../page/ManagerPage/UnitUsed/DetailUnitUsed/AddUserPage/AddUserPage";
import AddUserPage from "../page/SettingPage/AuthenticationPage/AddUserPage/AddUserPage";


export function Router() {
    let element = useRoutes([
        {
            path: 'login',
            element: <Login />,
            children: [
                {
                    path: 'reset-password',
                    element: <ResetPasswordPage />
                },
            ]
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
                    path: 'create-list/detail/:id',
                    element: <DetailCreateListPage />
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
                            path: 'contract/detail-authorized-contract/:id',
                            element:<DetailContractPage />
                        },
                        {
                            path: 'contract/detail-authorized-contract/:id/edit',
                            element:<EditContractPage />
                        },
                        {
                            path: 'contract/detail-mining-contract/:id',
                            element:<DetailMiningContract />
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
                            path: 'device/add-device',
                            element: <AddDevicePage />
                        },
                        {
                            path: 'authorized-partner',
                            element: <Authorized />
                        },
                        {
                            path: 'authorized-partner/detail/:id',
                            element: <DetailAuthorizedPartnerPage />
                        },
                        {
                            path: 'unit-used',
                            element: <UnitUsedPage />
                        },
                        {
                            path: 'unit-used/detail/:id',
                            element: <DetailUnitUsedPage />
                        },
                        {
                            path: 'unit-used/detail/:id/add-user',
                            element: <AddUserPageUnitUsed />
                        },
                        {
                            path: 'unit-used/detail/:id/detail-user/:uid',
                            element: <DetailUserPage />
                        },
                        {
                            path: 'unit-used/detail/:id/detail-user/:uid/update-user',
                            element: <UpdateUserPage />
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
                            path: 'authentication/edit-user/:id',
                            element: <EditInforUserPage />
                        },
                        {
                            path: 'authentication/add-user',
                            element: <AddUserPage />
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
