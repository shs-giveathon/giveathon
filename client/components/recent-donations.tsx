'use client';

import { FC, useEffect, useState } from 'react';
import { getApiUrl } from '@/lib/api-url';
import axios from 'axios';
import { format } from 'timeago.js';

interface RecentDonation {
  timestamp: string;
  amount: number;
  name: string;
  affiliation: string;
}

export const RecentDonations: FC = () => {
  const [donations, setDonations] = useState<RecentDonation[]>([]);
  const apiUrl = getApiUrl();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/getRecentDonations`, { limit: 10 });
        setDonations(data);
      } catch (err) {
        console.error('Error fetching recent donations:', err);
      }
    };

    fetchDonations();
  }, [apiUrl]);

  return (
    <div className='fade-in glass-effect rounded-lg p-4 text-center mx-auto mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Recent Donations</h2>
      <div className='grid grid-cols-1 gap-2'>
        {donations.map((donation, index) => (
          <div key={index} className='flex justify-between items-center px-4 py-2 bg-black/20 rounded-lg'>
            <div className='flex-1 text-left'>{donation.name}</div>
            <div className='flex-1 text-center'>${donation.amount.toFixed(2)}</div>
            <div className='flex-1 text-right'>
              <div>{donation.affiliation}</div>
              <div className='text-sm opacity-50'>{format(donation.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonations;
