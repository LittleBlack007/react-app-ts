import React, { ReactNode, useState, startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './aside.module.css';
import { routes, routesItem } from "@/router";
import * as icons from '@tabler/icons';
import { NavLink } from '@mantine/core';

function Aside(){
  const color = 'indigo';
  const variant = "light";
  const root = routes.find( item => item.path === '/' );
  const [ activeKey, setActiveKey ] = useState('');
  const navigate = useNavigate();
  // 遍历路由信息生成菜单
  function ergodicRoute(routes: routesItem[]){
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
        navList.push(
          <NavLink
            key={item.path}
            active={item.path === activeKey}
            label={item.meta?.name}
            icon={<Icon size={16} stroke={1.5} />}
            onClick={() => {setActiveKey(item.path);}}
            color={color}
            variant={variant}
          >{ergodicRoute(item.children)}</NavLink>
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
    return navList;
  }
  let ll;
  if(root && root.children && root.children.length > 0){
    ll = ergodicRoute(root.children);
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