import React, { ReactNode, useState } from "react";
import { useActionData, useLocation, useNavigate } from "react-router-dom";
import style from './aside.module.css';
import { routes, routesItem } from "@/router";
import * as icons from '@tabler/icons';
import { NavLink } from '@mantine/core';

function Aside(){
  const color = 'indigo';
  const variant = "light";
  const root = routes.find( item => item.path === '/' );
  const location = useLocation();
  const [ activeKey, setActiveKey ] = useState(location.pathname); // 当前路由路径默认激活项
  const navigate = useNavigate();
  // 遍历路由信息生成菜单
  function ergodicRoute(routes: routesItem[], defaultOpened: boolean): [ReactNode[],boolean]{
    const navList: ReactNode[] = [];
    routes.map((item:routesItem) => {
      if(item.meta?.hidden){
        return;
      }
      let iconName = 'IconAdjustmentsHorizontal';
      if((item.meta && item.meta.icon)){
        iconName = item.meta.icon
      }
      const IconPre = (icons as any)[iconName];
      const Icon = IconPre || icons.IconBug
      if(item.children && item.children.length > 0){
        // 如果激活对象在改菜单下的子集，则默认打开菜单项
        if(item.children.find(rItem => location.pathname === rItem.path)){
          defaultOpened = true;
        }
        const [ nextList, nextOpened ] = ergodicRoute(item.children,defaultOpened)
        const opened = defaultOpened || nextOpened
        navList.push(
          <NavLink
            key={item.path}
            active={item.path === activeKey}
            label={item.meta?.name}
            icon={<Icon size={16} stroke={1.5} />}
            color={color}
            variant={variant}
            defaultOpened={opened}
          >{nextList}</NavLink>
        )
      }else{
        navList.push(
          <NavLink
            label={item.meta?.name}
            key={item.path}
            active={item.path === activeKey}
            icon={<Icon size={16} stroke={1.5} />}
            onClick={() => {setActiveKey(item.path);navigate(item.path)}}
            color={color}
            variant={variant}
          ></NavLink>
        )
      }
    })
    return [navList, defaultOpened];
  }
  let ll;
  if(root && root.children && root.children.length > 0){
    ll = ergodicRoute(root.children, false)[0];
  }
  return (
    <aside className={style['aside-ppp']}>
      {ll 
        ?ll 
        :<NavLink
          key='/'
          active={'/' === activeKey}
          label='首页'
          icon={<icons.IconHome size={16} stroke={1.5} />}
          onClick={() => setActiveKey('/')}
          color={color}
          variant={variant}
        />
      }
    </aside>
  )
}

export default React.memo(Aside)