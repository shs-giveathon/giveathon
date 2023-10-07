'use client';

import { NextPage } from 'next';
import { getApiUrl } from '@/hooks/api-url';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingSpinner from '@/public/spinner.svg';
import { useParams } from 'next/navigation';

const ProfileId: NextPage = () => {
  const apiUrl = getApiUrl();
  const [data, setData] = useState<any>(['']);
  const params = useParams();

  // TODO add fetch

  if (!data)
    return (
      <>
        <div className='text-center font-bold text-3xl mt-4'>Give-A-Thon Profile</div>
        <div className='grid place-items-center'>
          <Image src={loadingSpinner} alt='loading' />
        </div>
      </>
    );

  return <div>{params.profileId}</div>;
};

export default ProfileId;
