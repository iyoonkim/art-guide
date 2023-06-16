import { useState } from 'react';
import { useTts } from 'react-tts';
import { useRouter } from 'next/router';

export default function Audio() {
  const router = useRouter();
  const { result } = router.query;
  const data = result ? JSON.parse(result) : {};
  const [value, setValue] = useState('');
  const { speak } = useTts({ volume: 1, rate: 1, pitch: 1 });

  const handleButton = () => {
    const textToRead = JSON.stringify(data, null, 2);
    speak({ text: textToRead });
  };

  return (
    <div className="container">
      <h1 className="title">검색 결과</h1>
      <pre className="data">{JSON.stringify(data, null, 2)}</pre>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background-color: #f2f7f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: "Dokdo", cursive;
        }

        .title {
          font-size: 24px;
          margin-bottom: 16px;
          color: #456268;
          font-weight: bold;
        }

        .data {
          font-family: "Dokdo", cursive;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 4px;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: auto;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <button onClick={handleButton}>음성 변환🎤</button>
    </div>
  );
}
