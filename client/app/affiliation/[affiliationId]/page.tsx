'use client';

import Navbar from '@/components/navbar/navbar';
import { getApiUrl } from '@/hooks/api-url';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingSpinner from '@/public/spinner.svg';
import { formatDate } from '@/utils/formatDate';

interface AffiliationData {
  History: [[string, number, string]];
  MoneyRaised: number;
}

const AffiliationIdPage: NextPage = () => {
  const apiUrl = getApiUrl();
  const [data, setData] = useState<AffiliationData | null>();
  const params = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/getInfoByAffiliation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliation: decodeURIComponent(params.affiliationId as string)
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
        <div className='fade-in glass-effect rounded-lg w-1/2 mx-auto font-headers text-center font-bold mt-4 text-3xl xs:text-4xl lg:text-6xl'>GiveAThn Affiliation</div>{' '}
        <div className='mt-4 grid place-items-center gap-2'>
          <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
            <p>{decodeURIComponent(params.affiliationId as string)}</p>
          </div>
          {data ? (
            <div className='w-[calc(100%-20px)] md:w-[80%] glass-effect text-center rounded-md p-2 fade-in'>
              <p className='text-xl'>Raised ${data.MoneyRaised.toFixed(2)}</p>
              <p>History</p>
              <div>
                {data.History.map((h: any) => {
                  return (
                    <div className='grid grid-flow-col' key={`${h[0]}-${h[1]}`}>
                      <div className='grid grid-cols-[max-content_max-content] mr-auto gap-2 place-items-center'>
                        <p className='mr-auto font-semibold'>{h[2]}</p>
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

export default AffiliationIdPage;
