import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import ipc from '../ipc/index.js'
import { Button } from 'antd';
import { generateOptions } from './utils.js'
import AddModal from '../pushData/index.js';

const Echarts = () => {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(1)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof ipc?.getDataJson !== 'function') {
      console.error('ipc.getDataJson is not a function');
    } else {
      try {
        if (reload > 0) { }
        ipc.getDataJson().then(res => {
          const data = JSON.parse(res)
          setData(data)
          console.log('✅ data loaded', data);
        })
      } catch (error) {
        console.error('❌ Error loading data:', error);
      }
    }
  }, [reload])

  // ECharts 配置选项
  const option = useMemo(() => {
    if (reload > 0) {
      return generateOptions(data)
    }
    return {}
  }, [data, reload])

  return (
    <div style={{ width: '100%' }}>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => setVisible(true)} type='primary'>
          添加数据
        </Button>
      </div>
      <AddModal visible={visible} setVisible={setVisible} setReload={setReload} />
    </div>
  );
};

export default Echarts;
