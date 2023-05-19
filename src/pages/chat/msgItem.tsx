import React from 'react';
import chatStyle from './chat.module.css';
import { Avatar } from '@mantine/core';

type IProps = {
  name: string,
  msg: string,
  time: string,
  avatar: string
}


export default function MsgItem(props: IProps){
  const myName = localStorage.getItem('userName');
  const isMe = myName === props.name;
  
  return (
    <div className={chatStyle.msgItem} style={{flexDirection: isMe ? 'row-reverse' : 'row' }}>
      <Avatar  src={props.avatar} radius="xl"></Avatar>
      <div className={chatStyle.msgBody}>
        <div className={chatStyle.msgInfo}>{props.name} {props.time}</div>
        <div className={chatStyle.msgText}>{props.msg}</div>
      </div>
    </div>
  )
} 