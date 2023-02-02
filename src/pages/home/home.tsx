/**
 * @author yuping.pang
 * @date 2022-12-09 14:44
 * @description 调试useState 
**/
import React, { useState } from "react";
import { Button, Card, Grid } from "@mantine/core";
import MyColorInputs from '../components/colorInputs';
import InputUser from '../components/useReducer';
import UseEffect from '../components/useEffect';
import CustomGetImgHook from "../components/customGetImgsHook";
import OpenAI from "../components/openAI";
import SecretConversion from "../components/secretConversion";
import ConstellationFortune from "../components/constellationFortune";

export default function App(){
  const initName = '初始化按钮名称';
  const clickedName = '点击了，再点一次回复';
  const [buttonText, setButtonText] = useState(initName);

  function handleClick(event: any): void{
    console.dir(event.target.innerText);
    const name = event.target.innerText === initName ? clickedName : initName;
    setButtonText(name)
  }

  return (
    <Grid grow style={{ textAlign: 'center' }}>
      <Grid.Col span={12}><SecretConversion /></Grid.Col>
      <Grid.Col span={12}><OpenAI /></Grid.Col>
      <Grid.Col span={6}><ConstellationFortune /></Grid.Col>
      <Grid.Col span={4}><UseEffect /></Grid.Col>
      <Grid.Col span={4}><CustomGetImgHook /></Grid.Col>
      <Grid.Col span={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Button onClick={handleClick} compact>{buttonText}</Button>
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <MyColorInputs />
        </Card>
      </Grid.Col>
      <Grid.Col span={3}><InputUser /></Grid.Col>
    </Grid>)
}