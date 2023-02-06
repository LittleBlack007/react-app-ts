/*
 这和redux不是一个东西, useReducer主要用来解决复杂结构的state和state处理逻辑比较复杂的情况.
事实上useReducer其实和数组的reducer函数更像, 都是对复杂和大量对象进行某种运算得到一个简单结果, 
不同的是useReducer产生的结果是一个state而已.其本质还是将 state 放到同一个地方处理，只是比 useState 更具可读性。
回到这个例子, 如果这个count的改变的同时需要关联其他十几个state的变化, 
你当然可以用N个单独的函数来达到同样的目的, 但这些函数之间乍看之下并不能看出关联性, 
但如果用了useReducer你就可以轻松将这些操作统合起来, 将来维护的时候也方便很多

useReducer 是 useState 的替代方案，useState 能做到的事，它都能做到，甚至做得更好。
useReducer 某种程度上解耦了操作逻辑(action)和后续的行为(一般是 UI 的更新)，虽然代码量变多了，但是看起来更加整洁。
*/
import React, { useReducer } from 'react';
import { Input, Badge, Card } from '@mantine/core';

const userInfoReducer = (state: any, action: any) => {
  switch(action.type){
    case 'setUserName':
      return {
        ...state, userName: action.payload.userName
      }
    default:
      return state;
  }
}

export default function InputUser(){
  const [ state, dispatch ] = useReducer(userInfoReducer, { userName: '初始值' });
  function setUserName(e: any): void{
    dispatch({ type: 'setUserName', payload:{ userName: e.target.value } })
  }
  return (
    <Card withBorder radius={'sm'}>
      <Input placeholder="set userName" onInput={setUserName}/>
      <Badge>{ state.userName }</Badge>
    </Card>
  )
}