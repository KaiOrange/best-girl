const { default: axios } = require('axios');

export default async function handler(request, response) {

  let res = {
    data: {
      items: []
    }
  }
  try {
    res = await axios({
      url: 'https://pic.sogou.com/napi/pc/searchList?' + request.url.replace('/api/sogou-api', ''),
      method: 'GET',
    });  
  } catch (error) {
    return response.status(500).send(error);
  }
  

  return response.status(200).send(res.data);
}
