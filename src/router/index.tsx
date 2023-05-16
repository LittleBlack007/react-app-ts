import {
  createBrowserRouter,
  useNavigate,
  Navigate,
  Outlet
} from 'react-router-dom';
import React, { useEffect, lazy, Suspense, ReactNode, ComponentType } from 'react';
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

type lazyFuncObj = () => Promise<{ default: ComponentType<any>; }>

// 路由懒加载
const LazyConponent = (func: lazyFuncObj, props:object = {}): ReactNode => {
  const LazyComp = lazy(func);
  return (
    <Suspense 
      fallback={
        <div>
          <LoadingOverlay style={{width:'100vw', height:'90vh',marginTop: '48px'}} 
            visible 
            overlayBlur={2} 
          />
        </div>
      }
    >
      <LazyComp {...props} />
    </Suspense>
  )
}

const App = () => import('@/App')
const Home = () => import('@/pages/home/home');
const SecretConversion = () => import('@/pages/components/secretConversion');
const ConstellationFortune = () => import('@/pages/components/constellationFortune');
const CustomGetImgHook = () => import("@/pages/components/customGetImgsHook");
const ColorInputs = () => import('@/pages/components/colorInputs');
const ScratchPrize = () => import('@/pages/components/scratchPrize');


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
      {
        path: '/range-images',
        meta:{
          name: '随机图片',
          icon: 'IconPhoto'
        },
        element: CustomGetImgHook
      },
      {
        path: '/next-routes',
        meta:{
          name: '嵌套路由',
          icon: 'IconAffiliate'
        },
        redirect: '/next-routes/next-routes-children/next-routes-grandchildren',
        children:[
          {
            path: '/next-routes/next-routes-children',
            meta:{
              name: '子路由',
              icon: 'IconAffiliate'
            },
            redirect: '/next-routes/next-routes-children/next-routes-grandchildren',
            children:[
              {
                path: '/next-routes/next-routes-children/next-routes-grandchildren',
                meta:{
                  name: '孙子路由',
                  icon: 'IconAffiliate'
                },
                element: ScratchPrize
              }
            ]
          }
        ]
      }
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
          navigate.element = <Navigate to={redirectRoute ? routeI.redirect : '/'} replace={true} />  // 找到重定向的路由才跳转，错误则先跳到根目录，后面改为404
          realChidren.unshift(navigate)
        }
        newItem.children = realChidren;
      }
      if(newItem.element){
        newItem.element = LazyConponent(newItem.element, newItem.meta?.props);
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