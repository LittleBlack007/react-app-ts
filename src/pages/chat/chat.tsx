import React,{ ChangeEvent, useRef, useState } from 'react';
import SocketIOClient from 'socket.io-client';
import chatStyles from './chat.module.css';
import { Input, Button, Notification  } from "@mantine/core";
import Message from '../components/message';

export default function Chat(){
  function setSocket(){
    // 同域名可以直接写端口号加路由（例如：":8080/xxx"）确保跨域问题已解决
    const socket = SocketIOClient("ws://10.20.6.48:3001", {
      // 这里transports的默认值为["polling", "websocket"] 也就是优先使用polling， 但是polling再谷歌浏览器连接不上
      transports: ["websocket", "polling"],
      // 这里的配置项有：IO工厂配置项、低级引擎配置项(会被设置到所有同一管理者的的socket实例上)
      // forceNew, multiplex, transports,upgrade,
      // rememberUpgrade,path,query,extraHeaders,withCredentials,
      // forceBase64,timestampRequests,
      // timestampParam,closeOnBeforeunload
        
      // 在 后端使用时，还有一些额外的配置项：
      // agent, pfx, key, passphrase, cert, ca, ciphers, rejectUnauthorized
        
      // 还有 ManagerOptions 管理性配置项：
      // autoConnect: false, // 是否自动连接，默认为true，设为false后，可以通过 connect() 或者 open()手动开启
      // reconnection: false // 是否自动重连，默认为true，设为false后，需要手动进行重连
      // reconnectionAttempts, reconnectionDelay, reconnectionDelayMax, randomizationFactor,timeout,parser
        
      // 鉴权配置
      // auth: {
      //   token: 'abcd'
      // }
    });
    socket.on("connect", () => {
      console.log('链接成功')
    });
      
    // 连接异常时，会触发
    socket.on("connect_error", (err) => {
      console.warn(err);
      // 如果连接异常，修改transports传输方式
      // socket.io.opts.transports = ["polling", "websocket"];
      // 鉴权失败的话，可以修改token，再进行重连
      // if (err.message === "invalid credentials") {
      //   socket.auth.token = "new abcd";
      //   // 手动重连
      //   socket.connect();
      // }
    });
  }
  

  const inputRef = useRef()
  const [userName, setUserName] = useState('');
  function handleInputUserName(e: ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    setUserName(value?.trim())
  }
  function onSubmit(){
    console.log(inputRef)
    Message.show('error','出错了')
  }
  return (
    <div className={chatStyles.container}>
      <Message />
      <div className={chatStyles.loginContainer}>
        <div className={chatStyles['login-form'] + " " +chatStyles['glass-mask']}>
          <h2>登记即可畅聊</h2>
          <Input
            value={userName}
            placeholder="您的大名"
            onInput={handleInputUserName}
          />
          <Button type="submit" onClick={onSubmit}>悄悄进入</Button>
        </div>
      </div>
    </div>
  )
}