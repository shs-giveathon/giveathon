'use client';

import { LeaderboardRow } from '@/components/leaderboard-row';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  // TODO switch to ssr
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/getTopPeople')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <div className='text-center font-bold text-3xl mt-4'>Give-A-Thon Leaderboard</div>
      <div className='px-12 mt-6 grid grid-cols-3 gap-4'>
        <div className='p-6 shadow-lg rounded-lg mr-10'>
          <h2 className='text-center text-6xl font-bold'>🥈</h2>
          <h3 className='mt-2 text-center text-2xl font-bold'>2nd Place</h3>
          <h2 className='mt-4 text-center text-4xl text-green-500 font-bold'>$75,000</h2>
          <h4 className='mt-4 text-center text-xl'>Connor Lin</h4>
        </div>
        <div className='p-6 shadow-lg rounded-lg'>
          <h2 className='text-center text-6xl font-bold'>🥇</h2>
          <h3 className='mt-2 text-center text-2xl font-bold'>1st Place</h3>
          <h2 className='mt-4 text-center text-4xl text-green-500 font-bold'>💸 $100,000</h2>
          <h4 className='mt-4 text-center text-xl'>Andrew Wolf</h4>
        </div>
        <div className='p-6 shadow-lg rounded-lg'>
          <h2 className='text-center text-6xl font-bold'>🥉</h2>
          <h3 className='mt-2 text-center text-2xl font-bold'>3rd Place</h3>
          <h2 className='mt-4 text-center text-4xl text-green-500 font-bold'>$50,000</h2>
          <h4 className='mt-4 text-center text-xl'>Mikhail Seviary</h4>
        </div>
      </div>
      <div className='px-56 mt-6 text-xl'>
        <div className='border-b-2 mb-1'>
          <div className='flex justify-between font-bold'>
            <h1>#.</h1>
            <h1>$ Raised</h1>
            <h1>Name</h1>
          </div>
        </div>
        {data && data.map((data, index) => <LeaderboardRow name={data[0]} moneyRaised={data[1]} rank={index} key={index} />)}
      </div>
    </>
  );
};

export default Home;
