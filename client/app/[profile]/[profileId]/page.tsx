'use client';

import { NextPage } from 'next';
import { getApiUrl } from '@/hooks/api-url';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingSpinner from '@/public/spinner.svg';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';

const ProfileId: NextPage = () => {
  const apiUrl = getApiUrl();
  const [data, setData] = useState<any | null>();
  const params = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/getInfoByEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: decodeURIComponent(params.profileId as string)
      })
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className='w-full h-screen pt-16'>
        <div className='text-center font-bold text-3xl mt-4'>Give-A-Thon Profile</div>
        <div className='grid place-items-center gap-2'>
          <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
            <p>{decodeURIComponent(params.profileId as string)}</p>
          </div>
          {data ? (
            <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
              <p className='font-semibold'>{data.Affiliation}</p>
              <p>History</p>
              <div>
                {data.History.map((h: any) => {
                  return (
                    <div className='grid grid-flow-col'>
                      <p className='mr-auto'>{h[0]}</p>
                      <p className='ml-auto'>${h[1].toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <Image src={loadingSpinner} alt='loading' />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileId;
