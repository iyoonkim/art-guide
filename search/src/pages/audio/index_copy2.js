import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';

export default function Audio() {
  const router = useRouter();
  const { result } = router.query;
  const data = result ? JSON.parse(result) : {};
  const [translatedData, setTranslatedData] = useState('');
  const { speak, speaking, supported } = useSpeechSynthesis();

  const apiKey = 'tJD6Uen4PC'; // 파파고 API 키를 입력하세요.

  async function translateText(text, source, target, apiKey) {
    const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': PiDmAhW_tHTH0Jx5853F,
        'X-Naver-Client-Secret': tJD6Uen4PC,
      },
      body: `source=${source}&target=${target}&text=${encodeURIComponent(text)}`,
    });

    const data = await response.json();
    const translatedText = data.message.result.translatedText;

    return translatedText;
  }

  useEffect(() => {
    async function translateData() {
      try {
        const translatedText = await translateText(
          JSON.stringify(data, null, 2),
          'en',
          'ko',
          apiKey
        );
        setTranslatedData(translatedText);
      } catch (error) {
        console.error(error);
      }
    }

    if (Object.keys(data).length > 0) {
      translateData();
    }
  }, [data]);

  const handleButton = () => {
    speak({ text: translatedData });
  };

  return (
    <div className="container">
      <h1 className="title">검색 결과</h1>
      <pre className="data">{translatedData}</pre>

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
          font-family: "font-bold";
        }

        .title {
          font-size: 30px;
          margin-bottom: 16px;
          color: #456268;
          font-weight: bold;
        }

        .data {
          font-family: "font-bold";
          background-color: #ffffff;
          padding: 50px;
          border-radius: 20px;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: auto;
		  max-width: 700px;
          max-height: 300px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
		
        .button {
          width: 100%;
          max-width: 700px;
          padding: 12px;
          margin-top: 16px;
          border-radius: 8px;
          background-color: white;
          color: black;
          font-size: 16px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #002ead;
          color: white;
        }
      `}</style>

      <button
        onClick={handleButton}
        disabled={speaking || !supported}
        className="button"
      >
        음성 변환🎤
      </button>
    </div>
  );
}
