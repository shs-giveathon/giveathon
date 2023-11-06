'use client';

import { LeaderboardRow } from '@/components/leaderboard-row';
import { LeaderboardTop3 } from '@/components/leaderboard-top-3';
import { getApiUrl } from '@/hooks/api-url';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loadingSpinner from '@/public/spinner.svg';
import { UsersComponent } from '@/components/users-component';
import axios from 'axios';

export type PersonData = [string, { MoneyRaised: number; Name: string }];

const UsersLeaderboardPage: NextPage = () => {
  const apiUrl = getApiUrl();

  const [data, setData] = useState<PersonData[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.post(`${apiUrl}/getTopPeople`);
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
          <div className='relative w-full flex gap-[6px] mt-[70px] md:mt-[110px] items-end'>
            {data.length !== 0 && (
              <>
                {data.length >= 2 && (
                  <div className='h-[calc(100%+30px)] md:h-[calc(100%+50px)] w-full'>
                    <LeaderboardTop3 name={data[1][1].Name} email={data[1][0]} moneyRaised={data[1][1].MoneyRaised} rank={2} animationDelay={200} />
                  </div>
                )}
                {data.length >= 1 && (
                  <div className='h-[calc(100%+60px)] md:h-[calc(100%+100px)] w-full'>
                    <LeaderboardTop3 name={data[0][1].Name} email={data[0][0]} moneyRaised={data[0][1].MoneyRaised} rank={1} animationDelay={300} />
                  </div>
                )}
                {data.length >= 3 && (
                  <div className='h-max w-full'>
                    <LeaderboardTop3 name={data[2][1].Name} email={data[2][0]} moneyRaised={data[2][1].MoneyRaised} rank={3} animationDelay={100} />
                  </div>
                )}
              </>
            )}
          </div>
          <UsersComponent />
        </div>
      </div>
    </>
  );
};

export default UsersLeaderboardPage;
