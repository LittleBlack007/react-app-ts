import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from 'react-router-dom';
import React, { useEffect, lazy } from 'react';

// 重定向组件
const Redirect = () => {
  const navigate = useNavigate();
  // 组件挂载时进行挂载
  useEffect(() => {
    useEffect(() => {
      navigate('/')
    })
  })
}

const App = lazy(() => import('@/App'))
const Home = lazy(() => import('@/pages/home/home'));
// 路由信息
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: "home",
        element: <Home />
      },
    ]
  }
])

export default router;