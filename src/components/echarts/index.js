import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import ipc from '../ipc/index.js'

const Echarts = () => {

  const [time, setTimeArray] = useState([])
  const [val, setValArray] = useState([])

  console.log({ time, val })

  useEffect(() => {
    ipc.getDataJson().then((data) => {
      setTimeArray(data.map(i => i.time))
      setValArray(data.map(i => i.val))
    })
  }, [])

  // ECharts 配置选项
  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['体重'],
      },
      xAxis: {
        type: 'category',
        data: time,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '体重',
          type: 'line',
          data: val,
        },
      ],
    }
  }, [time, val])

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default Echarts;
