import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import './lang';

const routeFiles = import.meta.glob('../pages/**/index.tsx', { eager: true });
console.log('routeFiles', routeFiles);

if (Object.keys(routeFiles).length == 1 && routeFiles['../pages/index.tsx']) {
  const Page = routeFiles['../pages/index.tsx'].default;
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
} else {
  const router = createBrowserRouter(
    Object.keys(routeFiles)
      .filter(
        (key) =>
          (key = !key.includes('components') && !key.includes('components'))
      )
      .map((key) => {
        const paths = key.split('/');
        const path = paths.slice(2, -1).reduce((acc, path) => {
          return acc + `/${path}`;
        }, '');
        const Page = (routeFiles[key] as any).default;
        return {
          path: path === 'home' || path === 'index.tsx' ? '/' : `${path}`,
          element: <Page />,
        };
      })
  );
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
