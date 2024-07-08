import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import ipc from '../ipc/index.js'

const Echarts = () => {

  const [time, setTimeArray] = useState([])
  const [val, setValArray] = useState([])

  useEffect(() => {
    if (typeof ipc?.getDataJson !== 'function') {
      console.error('ipc.getDataJson is not a function');
    } else {
      try {
        ipc.getDataJson().then(res => {
          const data = JSON.parse(res)
          console.log({ data });
          setTimeArray(data.map(i => i.time))
          setValArray(data.map(i => i.val))
          console.log('✅ data loaded', data);
        })
      } catch (error) {
        console.error('❌ Error loading data:', error);
      }
    }
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
          name: '趋势',
          type: 'line',
          data: val,
        },
      ],
    }
  }, [time, val])

  return (
    <div>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
      <button type="button" onClick={() => {
        if (typeof ipc?.addDataJson !== 'function') {
          console.error('ipc.addDataJson is not a function');
        } else {
          try {
            ipc.addDataJson(100).then(
              res => {
                console.log({ res });
                console.log('✅ data added');
              }
            )
          } catch (error) {
            console.error('❌ Error adding data:', error);
          }
        }
      }}
      >
        添加数据
      </button>
    </div>
  );
};

export default Echarts;
