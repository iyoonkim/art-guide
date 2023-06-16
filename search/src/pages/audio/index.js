//오디오 완성
import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useRouter } from 'next/router';

export default function Audio() {
  const router = useRouter();
  const { result } = router.query;
  const data = result ? JSON.parse(result) : {};
  const [value, setValue] = useState('');
  const { speak, speaking, supported } = useSpeechSynthesis();

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
          background-color: Lightsteelblue;
          font-family: "font-bold";
        }

        .title {
          font-size: 30px;
          margin-bottom: 16px;
          color:black;
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
      <br />
      <button
        onClick={handleButton}
        disabled={speaking || !supported}
        className="button"
      >
        오디오 듣기🎤
      </button>
    </div>
  );
}


