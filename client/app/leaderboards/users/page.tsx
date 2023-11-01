'use client';

import { LeaderboardRow } from '@/components/leaderboard-row';
import { LeaderboardTop3 } from '@/components/leaderboard-top-3';
import { getApiUrl } from '@/hooks/api-url';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loadingSpinner from '@/public/spinner.svg';
import { Navbar } from '@/components/navbar/navbar';
import { Tabs } from '@/components/tabs';

type PersonData = [string, { MoneyRaised: number; Name: string }];

const UsersLeaderboardPage: NextPage = () => {
  const apiUrl = getApiUrl();

  const [data, setData] = useState<PersonData[] | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/getTopPeople`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error('Error:', err));
  }, []);

  if (!data)
    return (
      <>
        <div className='w-full h-screen pt-16'>
          <div className='fade-in glass-effect rounded-lg w-1/2 mx-auto font-headers text-center font-bold mt-4 text-2xl md:text-4xl lg:text-6xl'>GiveAThn Leaderboard</div>{' '}
          {/* unknown character is unique to this font - for styling purposes only */}
          <div className='grid place-items-center mt-4'>
            <Image src={loadingSpinner} alt='loading' />
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className='w-full h-screen pt-16'>
        <div className='fade-in glass-effect rounded-lg w-1/2 mx-auto font-headers text-center font-bold mt-4 text-3xl md:text-4xl lg:text-6xl'>GiveAThn Leaderboard</div>{' '}
        {/* unknown character is unique to this font - for styling purposes only */}
        <div className='w-[calc(100%-20px)] md:w-[80%] m-auto grid grid-flow-row gap-2'>
          <div className='w-full grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[6px] mt-2 lg:mt-6'>
            {data.length !== 0 && (
              <>
                {data.length >= 2 && <LeaderboardTop3 name={data[1][1].Name} email={data[1][0]} moneyRaised={data[1][1].MoneyRaised} rank={2} animationDelay={200} />}
                {data.length >= 1 && <LeaderboardTop3 name={data[0][1].Name} email={data[0][0]} moneyRaised={data[0][1].MoneyRaised} rank={1} animationDelay={300} />}
                {data.length >= 3 && <LeaderboardTop3 name={data[2][1].Name} email={data[2][0]} moneyRaised={data[2][1].MoneyRaised} rank={3} animationDelay={100} />}
              </>
            )}
          </div>
          <div className='fade-in glass-effect rounded-lg px-4 text-xl' style={{ animationDelay: '400ms' }}>
            <div className='border-b-2 mb-1'>
              <div className='grid grid-cols-[repeat(3,minmax(0,1fr))] font-bold'>
                <h1 className='text-md md:text-xl lg:text-2xl mr-auto'>#</h1>
                <h1 className='text-md md:text-xl lg:text-2xl text-center'>$ Raised</h1>
                <h1 className='text-md md:text-xl lg:text-2xl ml-auto'>Name</h1>
              </div>
            </div>
            {data.length > 3 ? (
              data.slice(3).map((data, index) => <LeaderboardRow name={data[1].Name} email={data[0]} moneyRaised={data[1].MoneyRaised} rank={index + 4} key={index} />)
            ) : (
              <p className='text-center p-2'>No other users yet!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersLeaderboardPage;
