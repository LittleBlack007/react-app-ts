import { Card, Text, Select, Image } from "@mantine/core";
import React, { useState } from "react";
import { request, HttpMethod } from "@/server/request";

const constellationList = [
  { value: '白羊座', eng: 'aries', label: '白羊座', },
  { value: '金牛座', eng: 'taurus', label: '金牛座', },
  { value: '双子座', eng: 'gemini', label: '双子座', },
  { value: '巨蟹座', eng: 'cancer', label: '巨蟹座', },
  { value: '狮子座', eng: 'leo', label: '狮子座', },
  { value: '处女座', eng: 'virgo', label: '处女座', },
  { value: '天秤座', eng: 'libra', label: '天秤座', },
  { value: '天蝎座', eng: 'scorpio', label: '天蝎座', },
  { value: '射手座', eng: 'sagittarius', label: '射手座', },
  { value: '摩羯座', eng: 'capricorn', label: '摩羯座', },
  { value: '水瓶座', eng: 'aquarius', label: '水瓶座', },
  { value: '双鱼座', eng: 'pisces', label: '双鱼座' },
]

export default function ConstellationFortune(){
  const [ constellation, setConstellation ] = useState('天秤座');

  // function getFortune(){
  //   setLoading(true)
  //   request(
  //     `https://xiaoapi.cn/API/xzys_pic.php`,
  //     HttpMethod.get,
  //     { msg: constellation },
  //     {mode: 'no-cors'}
  //   ).then(res => {
  //     setLoading(false)
  //     console.log(res,1231)
  //   }).catch((err) => {
  //     setLoading(false)
  //     //console.log(err)
  //   })
  // }
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text weight={500} size="lg" mt="md">星座运势</Text>
      <Select
        style={{ width: '80%', display: "inline-block" }}
        placeholder='请选择星座'
        withinPortal
        data={constellationList}
        value={constellation}
        onChange={(e : any) => setConstellation(e)}
      />
      <Image
        width={300}
        style={{margin: '8px auto'}}
        src={`https://xiaoapi.cn/API/xzys_pic.php?msg=${constellation}`} 
        radius="md" 
      />
    </Card>
  )
}