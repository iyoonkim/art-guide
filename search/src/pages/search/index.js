// pages/index.js

import { useState } from 'react';
import { useRouter } from 'next/router';

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
        pathname: '/audio',
        query: { result: JSON.stringify(data) },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
	  
     
	  <div className="min-h-screen bg-navy flex flex-col justify-center items-center">
		  
	  <style jsx>{`
	    .Art{
		color: white;
        margin-left: 20px;
		line-height: 3;
		text-align: center;
		}
        .min-h-screen {
		background-color: Lightsteelblue;
		justify-content: center;
        align-items: center;
		}
		.button{
		background-color:white;
		hover:bg-blue;
		}
		.button:hover{
	     background-color:#002ead;
         transition: 0.7s;

		
		}
	 `}</style>
	  
	
		 
      <h1>
		  <span className="Art font-bold">Art Guide   </span>
		  <p></p>
     
      </h1>
	
      <h1 className="text-3xl font-bold text-primary mb-8">좋아하는 작품의 설명을 들어보세요.</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="작가명과 작품명을 입력하세요."
          className="w-96 h-32 p-4 rounded-lg shadow-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-black"
        />
        <button
          type="submit"
          className="button px-6 py-2 rounded-lg bg-blue text-black font-medium shadow-md hover:bg-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          검색하기
        </button>
      </form>
    </div>
  );
}

