import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './page/HomePage/HomePage';
import Login from './page/LoginPage/Login';
import { publicRoutes } from './routes';

interface typeRoute {
  component: Function,
  path: string
}

function App() {

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
