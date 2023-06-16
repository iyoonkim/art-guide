import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from "next/link";


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
      console.log(data);
      // 검색 결과를 처리하는 로직
      setResult(data);

     
      router.push('/search');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container font-boldㄴ">
      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 130%;
          height: 60%;
          background-image: url('/home.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
    
        }

        .content {
          z-index: 1;
          text-align: center;
        }

        h1 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        p {
          font-size: 18px;
          margin-bottom: 10px;
        }

        form {
          margin-top: 2px;
        }
      `}</style>
      <div className="background" />
      <div className="content font-bold">
        <h1 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          art guide
        </h1>
        <h1>Find a Perfect Audio Guide</h1>
        <p>좋아하는 작품의 설명을 들어보세요.</p>
        <p>인공지능이 들려주는 맞춤 설명</p>
        
		<Link href="/search">시작하기</Link>

    
      </div>
    </div>
  );
}