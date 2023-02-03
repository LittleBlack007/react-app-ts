import {
  createBrowserRouter,
  useNavigate
} from 'react-router-dom';
import React, { useEffect, lazy, Suspense } from 'react';
import { LoadingOverlay } from '@mantine/core';

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
const SecretConversion = lazy(() => import('@/pages/components/secretConversion'));
const ConstellationFortune = lazy(() => import('@/pages/components/constellationFortune'));

// import App from '@/App';
// import Home from '@/pages/home/home';
// import SecretConversion from '@/pages/components/secretConversion';
// import ConstellationFortune from '@/pages/components/constellationFortune';

export type routesItem = {
  path: string,
  element: any,
  meta?: {
    icon?: string,
    name: string,
  },
  children?: routesItem[]
}

// 路由信息
export const routes: routesItem[] = [
  {
    path: '/',
    element: App,
    children:[
      {
        path: "/home",
        meta:{
          name: '首页',
          icon: 'IconHome'
        },
        element: Home,
        children:[
          {
            path: "/home/constellation-fortune",
            meta:{
              name: '星座运势',
              icon: 'IconZodiacScorpio'
            },
            element: ConstellationFortune
          },
        ]
      },
      {
        path: "/secret-conversion",
        meta:{
          name: 'AES解密/加密',
          icon: 'IconReplaceFilled'
        },
        element: SecretConversion
      },
    ]
  }
]

// 生成路由信息
function generateRoutesForRouter(item: routesItem[]):routesItem[]{
  const data:routesItem[] = [];
  if(item && item.length > 0){
    item.map((routeI: routesItem) => {
      const newItem = {...routeI};
      data.push(newItem);
      if(routeI.children && routeI.children.length > 0){
        newItem.children = generateRoutesForRouter(routeI.children);
      }
      newItem.element = <Suspense fallback={<div ><LoadingOverlay style={{width:'100vw', height:'90vh',marginTop: '48px'}} visible overlayBlur={2} /></div>}>
      <routeI.element />
      </Suspense>
    })
  }
  return data;
}

const realRoutes: routesItem[] = generateRoutesForRouter(routes);
// 创建路由
const router = createBrowserRouter(realRoutes)

export default router;