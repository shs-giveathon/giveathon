'use client';

import { getApiUrl } from '@/lib/api-url';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingSpinner from '@/public/spinner.svg';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

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
      <div className='h-screen w-full pt-16'>
        <Link href='/'>
          <div className='fade-in glass-effect font-headers xs:text-4xl mx-auto mt-4 w-1/2 rounded-lg text-center text-3xl lg:text-6xl'>GiveAThon Affiliation</div>
        </Link>
        <div className='mt-4 grid place-items-center gap-2'>
          <div className='glass-effect fade-in w-[calc(100%-20px)] rounded-md p-2 text-center md:w-[80%]'>
            <p>{decodeURIComponent(params.affiliationId as string)}</p>
          </div>
          {data ? (
            <div className='glass-effect fade-in w-[calc(100%-20px)] rounded-md p-2 text-center md:w-[80%]'>
              <p className='text-xl'>Raised ${data.MoneyRaised.toFixed(2)}</p>
              <p>History</p>
              <div>
                {data.History.map((h: any) => {
                  return (
                    <div className='grid grid-flow-col' key={`${h[0]}-${h[1]}`}>
                      <div className='mr-auto grid grid-cols-[max-content_max-content] place-items-center gap-2'>
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

export const runtime = 'edge';
export default AffiliationIdPage;
