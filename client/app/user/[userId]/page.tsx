'use client';

import { NextPage } from 'next';
import { getApiUrl } from '@/hooks/api-url';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingSpinner from '@/public/spinner.svg';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';

const UserIdPage: NextPage = () => {
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
        email: decodeURIComponent(params.userId as string)
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
        <div className='fade-in glass-effect rounded-lg w-1/2 mx-auto font-headers text-center font-bold mt-4 text-3xl xs:text-4xl lg:text-6xl'>GiveAThn Profile</div>{' '}
        <div className='mt-4 grid place-items-center gap-2'>
          <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
            <p>{decodeURIComponent(params.userId as string)}</p>
          </div>
          {data ? (
            <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
              <Link href={`/affiliation/${data.Affiliation}`}>
                <p className='font-semibold text-xl'>{data.Affiliation}</p>
              </Link>
              <p>History</p>
              <div>
                {data.History.map((h: any) => {
                  return (
                    <div className='grid grid-flow-col' key={`${h[0]}-${h[1]}`}>
                      <div className='grid grid-cols-[max-content_max-content] mr-auto gap-2 place-items-center'>
                        <p className='mr-auto font-semibold'>{decodeURIComponent(params.userId as string)}</p>
                        <p className='mr-auto text-sm'>{formatDate(h[0])}</p>
                      </div>
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

export default UserIdPage;
