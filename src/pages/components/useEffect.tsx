/**
 * 调试useEffect hook
 * 用来引入具有副作用的操作，最常见的就是向服务器请求数据。
 * 以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
*/
import React, { useState, useEffect } from "react";
import { List, ThemeIcon, Button  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import {request, HttpMethod} from '@/server/request';
type dataType = {
  state: string,
  msg?: string,
  data: any
}

type toDoList = Array<{
  time: string,
  thing: string
}>

function mockGetData(){
  console.log(1231321)
  request('https://api.apiopen.top/api/sentences',HttpMethod.get,null,{mode: 'cors'})
}
export default function UseEffectExample(){
  const [ loading, setLoading ]  = useState(true);
  const [ toDoList, setToDoList ] = useState([{ time: '2022-12-16', thing: '抢防疫药品' }]);
  //let id = Math.random().toString().slice(1);
  return (
    <List
      spacing="xs"
      size="sm"
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      <List.Item><Button>刷新</Button></List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {mockGetData}
      </List.Item>
    </List>
  )
}

