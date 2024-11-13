'use client';

import { FC, useEffect, useState } from 'react';
import { getApiUrl } from '@/lib/api-url';
import axios from 'axios';
import { format } from 'timeago.js';
import Link from 'next/link';

interface RecentDonation {
  timestamp: string;
  amount: number;
  name: string;
  email: string;
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
    <div className='fade-in glass-effect mx-auto mt-4 rounded-lg p-4 text-center'>
      <h2 className='mb-4 text-2xl font-bold'>Recent Donations</h2>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
        {donations.map((donation, index) => (
          <div key={index} className='flex items-center justify-between rounded-lg bg-black/20 px-4 py-2'>
            <div className='flex-1 text-left'>
              <Link href={`/user/${donation.email}`}>{donation.name}</Link>
            </div>
            <div className='flex-1 text-center'>${donation.amount.toFixed(2)}</div>
            <div className='flex-1 text-right'>
              <Link href={`/affiliation/${donation.affiliation}`}>
                <div>{donation.affiliation}</div>
              </Link>
              <div className='text-sm opacity-50'>{format(donation.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonations;
