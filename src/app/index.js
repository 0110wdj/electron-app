import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.css';
import ipc from '../components/ipc';
import { Button, Input } from 'antd'
import { Form } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

// 增加调试功能
document.body.addEventListener('keyup', e => {
  if (e.key === 'F12') {
    ipc.openDevTools();
  }
});

const MainApp = () => {
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(1)
  const [isClick, setIsClick] = useState(false)
  const [form] = Form.useForm()

  return (
    <ConfigProvider locale={zhCN} >
      <div className="main-app">
        <h3>爬虫下载(先点重置，再点下载)</h3>
        <Form
          form={form}
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete='off'
        >
          <Form.Item
            label='开始页'
            name='start'
            placeholder='从第几页开始下载'
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={1}
          >
            <Input
              onChange={e => {
                setStart(e?.target?.value)
              }}
            />
          </Form.Item>
          <Form.Item
            label='结束页'
            name='end'
            placeholder='到第几页结束（包含）'
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={1}
          >
            <Input
              onChange={e => {
                setEnd(e?.target?.value)
              }}
            />
          </Form.Item>
        </Form>
        <div class='flex flex-row'>
          <div style={{ margin: '0 10px' }}>
            <Button
              onClick={() => {
                if (isClick) {
                  e?.preventDefault()
                } else {
                  setIsClick(true)
                  ipc.clearData();
                  setTimeout(() => {
                    setIsClick(false)
                  }, 500)
                }
              }}
              style={{ margin: '0 10px' }}
            >
              {isClick ? '等待..' : '重置'}
            </Button>
            <Button onClick={e => {
              if (isClick) {
                e.preventDefault()
              } else {
                if (!(+start > 0 && +end > 0)) {
                  e.preventDefault()
                  console.error("参数错误！");
                  return;
                }
                setIsClick(true)
                setTimeout(() => {
                  ipc.downloadData(start, end)
                }, 0);
                setTimeout(() => {
                  setIsClick(false)
                }, 10000)
              }
            }}>{isClick ? '等待..' : '下载'}</Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default MainApp