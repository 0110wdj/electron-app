import React from "react";
import Echarts from "../components/echarts";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.css';
import ipc from '../components/ipc';

// 增加调试功能
document.body.addEventListener('keyup', e => {
  if (e.key === 'F12') {
    ipc.openDevTools();
  }
});

const MainApp = () => {
  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorPrimary: '#1677ff',
      },
    }}>
      <div className="main-app">
        <h2>趋势</h2>
        <Echarts />
      </div>
    </ConfigProvider>
  )
}

export default MainApp