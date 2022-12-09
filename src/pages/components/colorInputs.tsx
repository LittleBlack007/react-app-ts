/**
 * @author yuping.pang
 * @date 2022-12-09 14:43
 * @description 调试 createContext css module 
**/
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { ColorInput, Avatar, Button, Space } from "@mantine/core";
import { IconStar } from '@tabler/icons';
import myStyles from './colorInputs.module.css';

type colorContextType = {
  color: string,
  setColor: Dispatch<SetStateAction<string>>
}
const ColorContext = createContext({} as colorContextType);

function Avatars(){
  const colorContext = useContext(ColorContext);
  const { color } = colorContext;
  return (<div style={{ display: 'flex' }}>
    <Avatar className={myStyles['color-inputs']} radius="xl">PPP</Avatar>
    <Space w='sm' />
    <Avatar color={color} radius="xl"> <IconStar size={24} /></Avatar>
  </div>)
}


function Buttons(){
  const colorContext = useContext(ColorContext);
  const { color } = colorContext;
  return (<div style={{ display: 'flex' }}>
    <Button style={{ backgroundColor: color+'44', color }}>第一个</Button>
    <Space w='sm' />
    <Button style={{ backgroundColor: color }}>第二个</Button>
  </div>)
}

export default function MyColorInputs() {
  console.log('colorInputs 刷新了')
  const [ color, setColor ] = useState('#13ebc3');
  return (<ColorContext.Provider value={{ color, setColor }}>
    <div><ColorInput value={ color } onChange={setColor} /></div>
    <Avatars />
    <Space h='sm' />
    <Buttons />
  </ColorContext.Provider>)
}