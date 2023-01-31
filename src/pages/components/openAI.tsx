import React, { useState, useRef } from 'react';
import { Card, TextInput, Select, Group, Button, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import  { request, HttpMethod } from '@/server/request';

type aiSendData = {
  'prompt': string,
  'model': string
}

export default function OpenAI(){
  const initialValues = {
    model: 'image-alpha-001',
    prompt: '齐天大神'
  }
  const imgRef = useRef(null);
  const [ imgSrc, setImgSrc ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const form = useForm({
    initialValues,
    validate: {
      model: (value: any) => ( value === undefined || value === null ) ? '请输入' : null,
      prompt: (value: any) => ( value === undefined || value === null ) ? '请输入' : null
    }
  })
  function onSubmit(value: aiSendData) {
    setImgSrc('');
    setLoading(true);
    request('/openai/generate-image', HttpMethod.post, value).then((res: any) => {
      setImgSrc(res.url);
      console.log(imgRef)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
    console.log(value);
  }

  return (
    <Card style={{ minHeight: '500px' }}>
      <div>
        <LoadingOverlay visible={loading} overlayBlur={2} />
      </div>
      <div style={{ maxWidth: '200px', display: 'inline-block', marginRight: '18px' }}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label='模型'
            placeholder='请选择模型'
            withAsterisk
            {...form.getInputProps('model')}
            data={[
              { value: 'image-alpha-001', label: '智能生成图片' },
              { value: 'text-davinci-003', label: '智能生成文本' },
              { value: 'dialogue-babi-001', label: '智能对话' },
            ]}
          />

          <TextInput
            label='描述'
            placeholder="请输入描述生成图片"
            withAsterisk
            {...form.getInputProps('prompt')} 
          />

          <Group position="right" mt="md">
            <Button type="submit">提交</Button>
          </Group>
        </form>
      </div>
      <img ref={imgRef} src={imgSrc} style={{maxHeight: '300px'}} />
    </Card>
  )
}