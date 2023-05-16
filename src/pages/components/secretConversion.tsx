import { Card, Grid, Textarea, Button, TextInput, Text } from "@mantine/core";
import React, { useState } from "react";
import CryptoJSAES from 'crypto-js/aes';
import CryptoJSENCUTF8 from "crypto-js/enc-utf8";
import { showNotification } from '@mantine/notifications';
import { IconArrowBadgeRight, IconArrowBadgeLeft } from '@tabler/icons'

export default function SecretConversion(){
  const [ decryptText, setDecryptText] = useState('');
  const [ encryptText, setEncryptText ] = useState('');
  const [ key, setKey ] = useState('静鸡鸡悄咪咪')

  function handleDecrypt(){ // 解密
    if(!key){
      showNotification({
        title: '请输入密码',
        message: '🤥',
      })
      return
    }
    const result = CryptoJSAES.decrypt(encryptText.trim(), key);
    setDecryptText(result.toString(CryptoJSENCUTF8));
  }

  function handleEncrypt(){ // 加密
    if(!key){
      showNotification({
        title: '请输入密码',
        message: '🤥',
      })
      return
    }
    const result = CryptoJSAES.encrypt(decryptText.trim(), key).toString();
    setEncryptText(result)
  }

  return (
    <Card shadow="sm" radius="md" withBorder style={{ height: '1000px' }}>
      <Text weight={500} size="lg" mt="md">
        加密聊天
      </Text>
      <Grid grow justify="center" align="center">
        <Grid.Col span={5}>
          <Textarea
            value={decryptText}
            onChange={(e) => setDecryptText(e.target.value)}
            placeholder="请输入明文，点击加密后得到密文"
            label="明文"
            withAsterisk
            minRows={8}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} onClick={handleEncrypt} size="xs">加密<IconArrowBadgeRight /></Button>
          <TextInput value={key} onChange={ (e) => setKey(e.target.value) } placeholder="密码" style={{margin: '8px 0'}} />
          <Button variant="gradient" gradient={{ from: 'blue', to: 'teal', deg: 60 }} onClick={handleDecrypt} size="xs"><IconArrowBadgeLeft />解密</Button>
        </Grid.Col>
        <Grid.Col span={5}>
          <Textarea
            value={encryptText}
            onChange={(e) => setEncryptText(e.target.value)}
            placeholder="请输入密文，点击解密后得到明文"
            label="密文"
            withAsterisk
            minRows={8}
          />
        </Grid.Col>
      </Grid>
    </Card>
  )
}