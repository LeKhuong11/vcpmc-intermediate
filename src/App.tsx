import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';
import Sidebar from './layout/Sidebar';
import { publicRoutes } from './routes';

interface typeRoute {
  component: Function,
  path: string
}

function App() {
  return (
    <div className="App">
        <Sidebar />
        <div>
          <Routes>
            {publicRoutes.map((route: typeRoute, index: number) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Routes>
        </div>
    </div>
  );
}

export default App;
