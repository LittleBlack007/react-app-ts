/**
 * 调试useEffect hook
 * 用来引入具有副作用的操作，最常见的就是向服务器请求数据。
 * 以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
*/
import React, { useState, useEffect } from "react";
import { List, ThemeIcon, Button, Card  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import {request, HttpMethod} from '@/server/request';
type dataType = {
  from: string,
  name: string,
}

type toDoList = Array<{
  time: string,
  thing: string
}>

function mockGetData(){
  return request('https://api.apiopen.top/api/sentences',HttpMethod.get,null,{mode: 'cors'})
}
export default function UseEffectExample(){
  const [ loading, setLoading ]  = useState(false);
  const [ toDoList, setToDoList ] = useState({name:'刷新可获取诗句',from: '诗名'});
  const [ id, setId ] = useState('1')
  useEffect(() => {
    setLoading(true);
    mockGetData().then(res => {
      const data: dataType = res.result;
      setToDoList(data);
      setLoading(false);
    })
  },[id])
  function changeId(){
    setId(Math.random().toString().slice(2));
  }
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <List
        spacing="xs"
        size="sm"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleDashed size={16} />
          </ThemeIcon>
        }
      >
        <List.Item><Button loading={loading} onClick={changeId}>刷新-{toDoList.from}</Button></List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              {loading ? <IconCircleDashed size={16} /> : <IconCircleCheck size={16} />}
            </ThemeIcon>
          }
        >
          {toDoList.name}
        </List.Item>
      </List>
    </Card>
  )
}

