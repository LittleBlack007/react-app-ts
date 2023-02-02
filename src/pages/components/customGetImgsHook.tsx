/**
 * 自定义 hook
 * 定义一个获取图片的hook
*/
import React, { useState, useEffect } from 'react';
import { Card, NumberInput, Button, Image, Grid, LoadingOverlay } from '@mantine/core';
import {request, HttpMethod} from '@/server/request';

function mockGetData(page: number){
  return request('https://api.apiopen.top/api/getImages?page=0&size=10',HttpMethod.get,{ page, size: 10 },{mode: 'cors'})
}

type dataType = {
  "id": number,
  "title": string,
  "url": string,
  "type": string
}

const useImgs = (page: number): [Array<dataType>, boolean] => {
  const [ loading, setLoading ] = useState(false);
  const [ imgs, setImgs ] = useState([] as Array<dataType>);
  useEffect(() => {
    setLoading(true);
    mockGetData(page).then(res => {
      setImgs(res.result.list);
      setLoading(false);
    })
  }, [page])
  return [ imgs, loading ];
}

export default function CustomGetImgHook(){
  const [ page, setPage ] = useState(0)
  const [ imgs, loading ] = useImgs(page);
  let timeId:any;
  function setRandomNumber(){
    const num = Math.random();
    setPage(parseInt(String(num * 10000)))
  }
  function onChangePage(val: number){
    if(timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      setPage(parseInt(String(val)))
    }, 300)
  }
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder> 
      <NumberInput value={page} onChange={onChangePage} style={{width: '80%', display: 'inline-block', marginRight: '8px'}} />
      <Button onClick={setRandomNumber}>随机</Button>
      <div style={{position: 'relative', marginTop: '16px' }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Grid grow>
          {
            imgs && imgs.map((item:dataType) => 
              <Grid.Col span={3} key={item.id}>
                <Image
                  height={80}
                  radius="md"
                  src={item.url}
                  alt={item.title}
                />
              </Grid.Col>
            )
          }
        </Grid>
      </div>
      
    </Card>
  )
}