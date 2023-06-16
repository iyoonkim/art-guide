import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useRouter } from 'next/router';

export default function Audio() {
  const router = useRouter();
  const { result } = router.query;
  const data = result ? JSON.parse(result) : {};
  const [translatedText, setTranslatedText] = useState('');
  const { speak, speaking, supported } = useSpeechSynthesis();
  const papagoApiKey = 'YOUR_PAPAGO_API_KEY';

  const translateText = async (text, source, target, apiKey) => {
    const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': apiKey,
        'X-Naver-Client-Secret': apiKey,
      },
      body: `source=${source}&target=${target}&text=${encodeURIComponent(text)}`,
    });

    const data = await response.json();
    const translatedText = data.message.result.translatedText;

    return translatedText;
  };

  useEffect(() => {
    async function translateData() {
      try {
        const translatedText = await translateText(
          JSON.stringify(data, null, 2),
          'en',
          'ko',
          papagoApiKey
        );
        setTranslatedText(translatedText);
        speak({ text: translatedText }); // 음성 변환
      } catch (error) {
        console.error(error);
      }
    }

    if (data) {
      translateData();
    }
  }, [data, papagoApiKey]);

  return (
    <div className="container">
      <h1 className="title">영어 번역</h1>
      <div className="form">
        <button
          className="button"
          disabled={speaking || !supported}
        >
          재생
        </button>
      </div>
      {translatedText && (
        <div className="translated">
          <h2 className="subtitle">번역 결과:</h2>
          <p className="text">{translatedText}</p>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1500px;
          height: 100vh;
          margin: 0 auto;
          display: flex;
          padding: 40px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-radius: 8px;
          background-color: #f2f7f9;
          font-family: 'font-bold';
        }

        .title {
          font-size: 30px;
          margin-bottom: 16px;
          color: #456268;
          font-weight: bold;
        }

        .translated {
          margin-top: 16px;
        }

        .subtitle {
          font-size: 18px;
          margin-bottom: 8px;
          color: #456268;
          font-weight: bold;
        }

        .text {
          font-family: 'font-bold';
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: auto;
          max-width: 700px;
          max-height: 300px;
          box-shadow: 0
		 }
      `}</style>
</div>
  );
}