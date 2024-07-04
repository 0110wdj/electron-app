import React from 'react';
import ReactECharts from 'echarts-for-react';
import jsonData from '../../../personal-data/data.json';

const time = jsonData.map(i => i.time)
const val = jsonData.map(i => i.val)

const Echarts = () => {
  // ECharts 配置选项
  const option = {
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
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default Echarts;
