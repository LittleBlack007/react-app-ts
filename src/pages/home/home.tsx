import React, { useState } from "react";
import { Button } from "@mantine/core";
import MyColorInputs from '../components/colorInputs';

export default function App(){
  const initName = '初始化按钮名称';
  const clickedName = '点击了，再点一次回复';
  const [buttonText, setButtonText] = useState(initName);

  function handleClick(event: any): void{
    console.dir(event.target.innerText);
    const name = event.target.innerText === initName ? clickedName : initName;
    setButtonText(name)
  }

  return (<>
    <div>
      <Button onClick={handleClick} compact style={{marginRight: '8px' }}>{buttonText}</Button>
    </div>
    <MyColorInputs />
  </>)
}