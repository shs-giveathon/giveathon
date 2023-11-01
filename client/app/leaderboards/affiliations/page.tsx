'use client';

import { getApiUrl } from '@/hooks/api-url';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loadingSpinner from '@/public/spinner.svg';
import { LeaderboardAffilationTop3 } from '@/components/leaderboard-a-top-3';
import { LeaderboardAffiliationRow } from '@/components/leaderboard-a-row';

type AffiliationData = [string, number];

const AffiliationsLeaderboardPage: NextPage = () => {
  const apiUrl = getApiUrl();

  const [data, setData] = useState<AffiliationData[] | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/getTopAffiliations`)
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
                {data.length >= 2 && <LeaderboardAffilationTop3 name={data[1][0]} moneyRaised={data[1][1]} rank={2} animationDelay={200} />}
                {data.length >= 1 && <LeaderboardAffilationTop3 name={data[0][0]} moneyRaised={data[0][1]} rank={1} animationDelay={100} />}
                {data.length >= 3 && <LeaderboardAffilationTop3 name={data[2][0]} moneyRaised={data[2][1]} rank={3} animationDelay={300} />}
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
              data.slice(3).map((data, index) => <LeaderboardAffiliationRow name={data[0]} moneyRaised={data[1]} rank={index + 4} key={index} />)
            ) : (
              <p className='text-center p-2'>No other affiliations yet!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliationsLeaderboardPage;
