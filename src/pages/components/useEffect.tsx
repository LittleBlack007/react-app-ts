/**
 * 调试useEffect hook
 * 用来引入具有副作用的操作，最常见的就是向服务器请求数据。
 * 以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
*/
import React, { useState } from "react";
import { List, ThemeIcon,  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';

type dataType = {
  state: string,
  msg?: string,
  data: any
}

type toDoList = Array<{
  time: string,
  thing: string
}>
function mockGetData(data: dataType){
  fetch('https://api.apiopen.top/api/sentences')
}

export default function UseEffectExample(){
  const [ loading, setLoading ]  = useState(true);
  const [ toDoList, setToDoList ] = useState([{ time: '2022-12-16', thing: '抢防疫药品' }]);
  let id = Math.random().toString().slice(1);
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
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
  )
}

