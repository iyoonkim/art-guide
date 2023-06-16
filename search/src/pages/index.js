import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),
      });
      const data = await response.json();
      router.push({
        pathname: '/search',
        query: { result: JSON.stringify(data) },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px;
		  font-family:font-bold;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 130%;
          height: 50%;
          background-image: url('/home.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .content {
          z-index: 1;
		  font-family:font-bold;
        }

        h1 {
          font-size: 54px;
          font-weight: bold;
		  line-height: 1.1;
        }

        .Art {
          color: white;
          text-align: left;
          margin-left: 10px;
          margin-bottom: 80px;
        }

        .Guide {
          color: white;
          text-align: left;
          margin-left: 10px;
          margin-bottom: 80px;
        }

        p {
          font-size: 24px;
          margin-bottom: 10px;
        }

        form {
          margin-top: 2px;
        }
      `}</style>
      <div className="background" />
      <div className="content">
        <h1>
          <span className="Art">Art</span>
          <br></br>
          <span className="Guide">Guide</span>
        </h1>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
		<br />
        <br />
        
        <h1>Find a Perfect Audio Guide</h1>
        <p>좋아하는 작품의 설명을 들어보세요.</p>
        <p>인공지능이 들려주는 오디오 가이드</p>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue text-black font-medium shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
