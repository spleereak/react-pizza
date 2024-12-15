import './scss/app.scss'
import React from 'react';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))

export default function App() { 

  return (     
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={
            <React.Suspense fallback={<div>Идёт загрузка</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path='/pizza/id'
          element={
            <React.Suspense fallback={<div>Идёт загрузка</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path='*'
          element={
            <React.Suspense fallback={<div>Идёт загрузка</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );

}
