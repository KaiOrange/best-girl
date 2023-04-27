const { default: axios } = require('axios');

export default async function handler(request, response) {

  let res = {
    data: {
      data: {
        items: []
      }
    }
  };
  let url = 'https://pic.sogou.com/napi/pc/searchList?' + request.url.replace('/api/sogou-api', '');
  console.log(url);
  try {
    res = await axios({
      url: url,
      method: 'GET',
    });  
  } catch (error) {
    console.log('报错：', error);
  }
  

  return response.status(200).send(res.data);
}
