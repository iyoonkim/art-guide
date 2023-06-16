import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { source, target, text } = req.body;

  const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': 'YOUR_CLIENT_ID',
      'X-Naver-Client-Secret': 'YOUR_CLIENT_SECRET',
    },
    body: `source=${source}&target=${target}&text=${encodeURIComponent(text)}`,
  });

  const data = await response.json();
  const translatedText = data.message.result.translatedText;

  res.status(200).json({ translatedText });
}
