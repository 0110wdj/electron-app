const { fileCheck } = require('./filecrud.js')

const mainIndex = () => {
  try {
    const file_is_ready = fileCheck()
    if (!file_is_ready) {
      console.log('程序准备过程异常：', error);
      throw error
    }
    console.log('程序准备过程正常');
  } catch (error) {
    console.error('程序准备过程异常：', error);
    throw error
  }
}

module.exports = {
  mainIndex
}
