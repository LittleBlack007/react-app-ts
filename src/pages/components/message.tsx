import React, { ReactNode } from "react";
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import style from './css/message.module.css';

interface IState{
  displayIs: boolean,
  title: ReactNode,
  state: string,
}
type IProps = unknown

export default class Message extends React.Component<IProps, IState>{
  static setState: any;
  static timeoutId: NodeJS.Timeout | undefined;
  static show(state: string, text: ReactNode, timeout?: number){
    Message.timeoutId && clearTimeout(Message.timeoutId);
    this.setState({
      displayIs: true,
      title: text,
      state
    }, () => {
      Message.timeoutId = setTimeout(() => {
        this.setState({
          displayIs: false,
        })
      }, timeout || 1000)
    })
  }

  constructor(props: Readonly<IProps>){
    super(props);
    this.state = {
      displayIs: false,
      title: '',
      state: 'success'
    }
    Message.show = Message.show.bind(this);
  }

  componentWillUnmount(){
    this.setState({
      displayIs: false
    })
    Message.timeoutId && clearTimeout(Message.timeoutId);
  }
  render(): React.ReactNode {
    const { displayIs, title, state } = this.state;
    return (
      displayIs
      ?
        <Notification
          className={style['message-box']}
          style={{
            position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', 
          }}
          icon={
            state === 'success' ? <IconCheck size="0.7rem" /> : <IconX size="0.7rem" />
          }
          color={state === 'success' ? 'teal' : 'red'} 
          title={title}
        >
        </Notification>
      : null
    )
  }
  
}