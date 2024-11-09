'use client';

import { FC, useState, useEffect } from 'react';
import { getApiUrl } from '@/lib/api-url';
import axios from 'axios';

export const TotalRaised: FC = () => {
  const apiUrl = getApiUrl();
  const fetchLink = `${apiUrl}/getTotalRaised`;

  const [total, setTotal] = useState('0');

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const { data } = await axios.post(fetchLink);
        setTotal(Number(data).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        console.log('Total:', data);
      } catch (err) {
        console.error('Error fetching total:', err);
      }
    };

    fetchTotal();
  }, [fetchLink]);

  return (
    <div className='glass-effect mx-auto mt-4 rounded-lg p-4 text-center'>
      <h2 className='mb-2 text-2xl font-bold'>Total Raised</h2>
      <p className='text-7xl'>${total}</p>
    </div>
  );
};

export default TotalRaised;
