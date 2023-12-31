'use client';

import { getApiUrl } from '@/lib/api-url';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loadingSpinner from '@/public/spinner.svg';
import { LeaderboardAffilationTop3 } from '@/components/leaderboard-a-top-3';
import { LeaderboardAffiliationRow } from '@/components/leaderboard-a-row';
import axios from 'axios';
import { AffiliationsComponent } from '@/components/affiliations-component';
import Countdown from '@/components/countdown';

export type AffiliationData = [string, number];

const AffiliationsLeaderboardPage: NextPage = () => {
  const apiUrl = getApiUrl();
  const [data, setData] = useState<AffiliationData[] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/getTopAffiliations`, { limit: 3, start: 0 });
        setData(response.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  if (!isMounted) return null;

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
        <div className='w-[calc(100%-20px)] mt-4 md:mt-8 md:w-[80%] m-auto grid grid-flow-row gap-2'>
          <Countdown />
          <div className='relative w-full flex gap-[6px] mt-[70px] md:mt-[125px] items-end'>
            {data.length !== 0 && (
              <>
                {data.length >= 2 && (
                  <div className='h-[calc(100%+30px)] md:h-[calc(100%+50px)] w-full'>
                    <LeaderboardAffilationTop3 name={data[1][0]} moneyRaised={data[1][1]} rank={2} animationDelay={200} />
                  </div>
                )}
                {data.length >= 1 && (
                  <div className='h-[calc(100%+60px)] md:h-[calc(100%+100px)] w-full'>
                    <LeaderboardAffilationTop3 name={data[0][0]} moneyRaised={data[0][1]} rank={1} animationDelay={100} />
                  </div>
                )}
                {data.length >= 3 && (
                  <div className='h-max w-full'>
                    <LeaderboardAffilationTop3 name={data[2][0]} moneyRaised={data[2][1]} rank={3} animationDelay={300} />
                  </div>
                )}
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
