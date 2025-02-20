const fs = require('node:fs');
const path = require('node:path')
const rp = require('request-promise');
const { getDataPath } = require('../../elmain/filecrud.js');

let list = [];

const getOption = (index) => {
  const url = 'https://www.sczwfw.gov.cn/cns-bmfw-websdt/rest/cnspublic/scwebsitecaseinfoaction/getCaseInfoDeatil'
  const requestData = { "token": "", "params": { "caseguid": list[index] } }

  const option = {
    url: url,//请求路径
    method: "POST",//请求方式，默认为get
    headers: {//设置请求头
      "content-type": "application/json",
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    },
    body: JSON.stringify(requestData)//post参数字符串
  }

  return option
}

/* 获取某页数据 */
const getDetil = async () => {
  const dirpath = getDataPath();
  console.log({ dirpath });

  for (let i = 0; i < list.length; i++) {
    try {
      console.log(`read file ${i}/${list.length}`);
      await rp(getOption(i)).then(async (parsedBody) => {
        const obj = JSON.parse(parsedBody)
        if (obj.status.code == 1) {
          const custom = obj.custom
          fs.appendFileSync(path.resolve(dirpath, './title.txt'), custom.rqsttitle + '\n')
          const str = custom.answercontent?.replaceAll('\n', '').replaceAll('\r', '').replaceAll(' ', '')
          fs.appendFileSync(path.resolve(dirpath, './context.txt'), (str || '空') + '\n')
          fs.appendFileSync(path.resolve(dirpath, './unit.txt'), custom.answerou + '\n')
          fs.appendFileSync(path.resolve(dirpath, './time.txt'), custom.finishtime + '\n')
        }
      })
    } catch (error) {
      Promise.reject()
    }
  }
  Promise.resolve()
}


const run = async (array) => {
  try {
    array.forEach((item) => {
      if (item) {
        list.push(item.split('cguid=')[1])
      }
    })
    await getDetil()
    return Promise.resolve()
  } catch (error) {
    console.error(error);
    return Promise.reject()
  } finally {
    list = []
  }
}

module.exports = {
  run
}