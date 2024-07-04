import React from 'react';
import ReactECharts from 'echarts-for-react';

const Echarts = () => {
  // ECharts 配置选项
  const option = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['销量'],
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default Echarts;
