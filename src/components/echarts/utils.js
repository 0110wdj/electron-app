const generateOptions = (data) => {

  const time = data.map(item => item.time);
  const val = data.map(item => item.val);

  const options = {
    tooltip: {
      trigger: 'axis',
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
        name: 'weight',
        type: 'line',
        data: val,
      },
    ],
  }

  return options;
}

export { generateOptions };