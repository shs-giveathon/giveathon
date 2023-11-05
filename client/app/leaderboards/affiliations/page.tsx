'use client';

import { getApiUrl } from '@/hooks/api-url';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loadingSpinner from '@/public/spinner.svg';
import { LeaderboardAffilationTop3 } from '@/components/leaderboard-a-top-3';
import { LeaderboardAffiliationRow } from '@/components/leaderboard-a-row';
import axios from 'axios';
import { AffiliationsComponent } from '@/components/affiliations-component';

export type AffiliationData = [string, number];

const AffiliationsLeaderboardPage: NextPage = () => {
  const apiUrl = getApiUrl();

  const [data, setData] = useState<AffiliationData[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post(`${apiUrl}/getTopAffiliations`);
      setData(response.data);
    };
    fetch();
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
          <AffiliationsComponent />
        </div>
      </div>
    </>
  );
};

export default AffiliationsLeaderboardPage;
