import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cart, Detail, List, Order, OrderDetail, OrderList } from '../pages';

interface PagesI {
  path: string;
  element: React.ReactNode;
}

const RoutesConfig = () => {
  const pages: PagesI[] = [
    {
      path: '/',
      element: <List />,
    },
    {
      path: '/detail/:id',
      element: <Detail />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '/order',
      element: <Order />,
    },
    {
      path: '/order-list',
      element: <OrderList />,
    },
    {
      path: '/order/:id',
      element: <OrderDetail />,
    },
  ];

  return (
    <Routes>
      {pages.map((page) => (
        <Route key={page.path} path={page.path} element={page.element} />
      ))}
    </Routes>
  );
};

export default RoutesConfig;
