import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Audio() {
  const router = useRouter();
  const { result } = router.query;
  const data = result ? JSON.parse(result) : {};
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const text = JSON.stringify(data, null, 2);
    convertTextToSpeech(text);
  }, [data]);

  const convertTextToSpeech = async (text) => {
    try {
      const response = await fetch('/api/convert-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const { audioUrl } = await response.json();
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">검색 결과</h1>
      <pre className="data">{JSON.stringify(data, null, 2)}</pre>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background-color: #f4f4f4;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: "Comic Sans MS", cursive;
        }

        .title {
          font-size: 24px;
          margin-bottom: 16px;
          color: #0e0f37;
          font-weight: bold;
        }

        .data {
          font-family: "Comic Sans MS", cursive;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 4px;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: auto;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
