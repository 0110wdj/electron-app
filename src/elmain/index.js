const { fileCheck } = require('./filecrud.js')

const mainIndex = () => {
  try {
    fileCheck()
    console.log('程序已完成准备');
  } catch (error) {
    console.error('程序准备过程异常：', error);
  }
}

module.exports = {
  mainIndex
}
