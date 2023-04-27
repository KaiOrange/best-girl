const { default: axios } = require('axios');

export default async function handler(request, response) {

  let res = await axios({
    url: 'https://pic.sogou.com/napi/pc/searchList?' + request.url.replace('/api/sogou-api', ''),
    method: 'GET',
  });

  return response.status(200).send(res.data);
}
