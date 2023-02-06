import {
  createBrowserRouter,
  useNavigate,
  Navigate
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


export type routesItem = {
  path: string,
  element?: any,
  redirect?: string
  meta?: {
    icon?: string,
    name: string,
    hidden?: true,
    props?:object
  },
  children?: routesItem[]
}

// 路由信息
export const routes: routesItem[] = [
  {
    path: '/',
    element: App,
    redirect: '/home',
    children:[
      {
        path: "/home",
        meta:{
          name: '首页',
          icon: 'IconHome'
        },
        element: Home,
      },
      {
        path: "/constellation-fortune",
        meta:{
          name: '星座运势',
          icon: 'IconZodiacScorpio'
        },
        element: ConstellationFortune
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
        const realChidren = generateRoutesForRouter(routeI.children);
        if(routeI.redirect){ // 路由重定向
          const redirectRoute = realChidren.find(cItem => cItem.path === routeI.redirect);
          const navigate:routesItem = {
            path: routeI.path,
            meta:{
              hidden: true,
              name: '转' + routeI.path,
              props: { to: routeI.redirect }
            },
          }
          if(redirectRoute){ // 找到重定向的路由
            navigate.element = <Navigate to={routeI.redirect} replace={true} />
          }else{
            navigate.element = <Navigate to='/' replace={true} />
          }
          realChidren.unshift(navigate)
        }
        newItem.children = realChidren;
      }
      if(newItem.element){
        newItem.element = <Suspense fallback={<div ><LoadingOverlay style={{width:'100vw', height:'90vh',marginTop: '48px'}} visible overlayBlur={2} /></div>}>
          <routeI.element {...newItem.meta?.props}  />
        </Suspense>
      }
    })
  }
  return data;
}

const realRoutes: routesItem[] = generateRoutesForRouter(routes);
// 创建路由
const router = createBrowserRouter(realRoutes,{
})

export default router;