import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { auth } from './firebase/configfb';
import HomePage from './page/HomePage/HomePage';
import Login from './page/LoginPage/Login';
import { fetchUser } from './redux/slice/userSlice';
import { useAppDispatch } from './redux/store';
import { publicRoutes } from './routes';

interface typeRoute {
  component: Function,
  path: string
}

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    const unSub = auth.onAuthStateChanged((currentUser) => {
        if(currentUser) {
          const { uid } = currentUser;
          dispatch(fetchUser(uid))
          
          return
        }
        navigate('login')        
    })

    //cleanup function
    return () => {
        unSub();
    }
}, [navigate])

  return (
    <div className="App">
        <Routes>
            <Route path='login' element={<Login />}/>
            <Route path='/' element={<HomePage />}>
              {publicRoutes.map((route: typeRoute, index: number) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page />} />
              })}
            </Route>
        </Routes>
        
    </div>
  );
}

export default App;
