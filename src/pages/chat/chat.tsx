import React,{ ChangeEvent, useEffect, useState } from 'react';
import chatStyles from './chat.module.css';
import { Input, Button, Textarea  } from "@mantine/core";
import Message from '../components/message';
import { IconLogout } from '@tabler/icons';
import MsgItem from './msgItem';
import setSocket from './sock';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import moment from 'moment';
import BeautyAvatar from './beautyAvatar';

const moduleFiles = require.context('./avatarImgs')
const avatarList = moduleFiles.keys().map((modulePath) => {
  const imgPath = moduleFiles(modulePath); //.default;
  return imgPath
})
interface msgType{
  name: string,
  msg: string,
  time: string,
}
interface logoutType{
  onlineCount: number,
  user: userType
}
interface userType {
  id: string,
  userName: string
}
interface loginInType {
  socketId: string,
  ip: string,
  user: string,
  event: string,
  message: string,
  onlineCount: number
}
type msgListType = Array<msgType>

export default function Chat(){
  const [ onlineCount, setOnlineCount ] = useState(0);
  const [comeInIs, setComeInIs] = useState(false);
  const [ msgList, setMsgList ] = useState([] as msgListType);
  const [userName, setUserName] = useState('');
  const [socket, setStateSocket] = useState({} as Socket<DefaultEventsMap, DefaultEventsMap>)
  const [ msg, setMsg ] = useState('');
  function bandEventSocket(){
    const socket = setSocket()
    setStateSocket(socket);
    // 连接成功
    socket.on("connect", () => {
      console.log('连接成功')
      socket.emit('login', { id: socket.id, userName: userName });
    });

    // 登进
    socket.on('login', (data:loginInType) => {
      setOnlineCount(data.onlineCount);
      Message.show('success',JSON.stringify(data.message));
    })
    // 登出
    socket.on('logout', (data:logoutType) => {
      setOnlineCount(data.onlineCount);
      Message.show('success',data.user.userName + '退出群聊');
    })
    // 接收到消息
    socket.on('message', (data: msgType) => {
      console.log(data,1231321)
      setMsgList(prev => [...prev,data])
    })

    // 连接异常时，会触发
    socket.on("connect_error", (err) => {
      Message.show('error',JSON.stringify(err));
      // 如果连接异常，修改transports传输方式
      // socket.io.opts.transports = ["polling", "websocket"];
      // 鉴权失败的话，可以修改token，再进行重连
      // if (err.message === "invalid credentials") {
      //   socket.auth.token = "new abcd";
      //   // 手动重连
      //   socket.connect();
      // }
    });
    socket.on('disconnect', () => {
      console.log('退出成功')
    })
  }
  const [ avatar, setAvatar ] = useState('');
  useEffect(() => {
    return setAvatar(avatarList[Math.floor(Math.random() * avatarList.length)])
  },[])
  // useEffect(() => {
  //   console.log('chat 12312 useEffect')
  //   bandEventSocket();
  //   return () => {
  //     console.log('chat return 1231231 useEffect')
  //     socket.disconnect();
  //   }
  // },[])
  useEffect(() => {
    const localUserName = localStorage.getItem('userName');
    if(localUserName){
      setUserName(localUserName)
    }
  },[])

  function handleInputUserName(e: ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    setUserName(value?.trim())
  }
  function handleInputMsg(e: ChangeEvent<HTMLTextAreaElement>){
    const value = e.currentTarget.value;
    setMsg(value)
  }
  function handleSendMsg(){
    setMsg('')
    const data = { name: userName, msg: msg, time: moment().format('YYYY-MM-DD HH:mm:ss')  };
    socket.emit('message', data)
  }
  
  // 登记
  function onSubmit(){
    if(!userName.trim()){
      Message.show('error','填写大名之后才能进入');
      return;
    }
    localStorage.setItem('userName', userName);
    setComeInIs(true);
    if(Object.getOwnPropertyNames(socket).length === 0){ // 第一次初始化
      bandEventSocket();
    }else if(!socket.connected){ // 有了socket之后，未连接则要链接一下
      socket.connect();
    }
  }
  // 登出
  function handleLogout(){
    setComeInIs(false);
    socket.disconnect();
  }

  return (
    <div className={chatStyles.container}>
      <Message />
      <div className={chatStyles.chatContainer}>
        <BeautyAvatar />
      {!comeInIs 
        ? 
        <div className={chatStyles['login-form'] + " " +chatStyles['glass-mask']}>
          <h2>登记即可畅聊</h2>
          <Input
            value={userName}
            placeholder="请输入您的大名"
            onInput={handleInputUserName}
          />
          <Button type="submit" onClick={onSubmit}>悄悄进入</Button>
        </div>
        :
        <div 
          className={`${chatStyles['chating-page']} ${chatStyles['glass-mask']}`}
        >
          
          <div className={chatStyles['chating-page-header']}>
            <span className={chatStyles['chating-page-online']}>{onlineCount}在线</span>
            <span className={chatStyles['chating-page-name']}>{userName}</span>
            <IconLogout 
              className={chatStyles['chating-page-icon']}
              onClick={handleLogout}
            />
          </div>
          <div className={chatStyles.msgList}>
            {msgList.map((item,index) => (
              <MsgItem key={index} avatar={avatar} name={item.name} msg={item.msg} time={item.time} />
            ))}
            
          </div>
          <div>
          <Textarea
            className={chatStyles.msgInput}
            autosize
            minRows={1}
            value={msg}
            onChange={handleInputMsg}
          />
          <Button 
            className={chatStyles.msgBtn} 
            variant="gradient" 
            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            size="xs"
            onClick={handleSendMsg}
          >发送</Button>
          </div>
        </div>
      }
      </div>
      
    </div>
  )
}