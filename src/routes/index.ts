import CreateList from "../page/CreateListPage/CreateList";
import PlayList from "../page/PlaylistPage/PlayList";
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
    }
]