'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { LeaderboardRow } from '@/components/leaderboard-row';
import { PersonData } from '@/app/leaderboards/users/page';
import axios from 'axios';
import { getApiUrl } from '@/lib/api-url';

export const UsersComponent: FC = () => {
  const [users, setUsers] = useState<PersonData[]>([]);
  const [dontFetch, setDontFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const apiUrl = getApiUrl();

  const initalUserCount = 10;
  const fetchMoreAmount = 5;
  const fetchLink = `${apiUrl}/getTopPeople`;
  const initalSkip = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(fetchLink, {
          limit: initalUserCount,
          start: initalSkip
        });

        const data = response.data;
        setUsers(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching users [INITIAL]:', err);
      }
    };

    fetchUsers();
  }, [fetchLink]);

  useEffect(() => {
    const fetchMoreUsers = async () => {
      if (dontFetch) return;
      try {
        setDontFetch(true);

        const response = await axios.get(fetchLink, {
          limit: fetchMoreAmount,
          start: skip + initalSkip + initalUserCount
        });

        const data = response.data;
        setUsers(prevUsers => [...prevUsers, ...data]);
        setSkip(prevSkip => prevSkip + fetchMoreAmount);
        if (data.length === 0) {
          setDontFetch(true);
          return;
        }
        setDontFetch(false);
      } catch (err) {
        console.error('Error fetching users [INCREMENTAL]:', err);
      }
    };

    const container = lastElementRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMoreUsers();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [users, skip, dontFetch, fetchLink]);

  if (isLoading) return null;

  return (
    <div className='fade-in glass-effect rounded-lg px-4 text-xl mb-[60px] p-2' style={{ animationDelay: '400ms' }}>
      <div className='my-2'>
        <div className='grid grid-cols-[repeat(3,minmax(0,1fr))] font-bold'>
          <h1 className='text-md md:text-xl lg:text-2xl mr-auto'>#</h1>
          <h1 className='text-md md:text-xl lg:text-2xl text-center'>$ Raised</h1>
          <h1 className='text-md md:text-xl lg:text-2xl ml-auto'>Name</h1>
        </div>
      </div>
      {users.length > 0 ? (
        users.map((user, index) => <LeaderboardRow name={user[1].Name} email={user[0]} moneyRaised={user[1].MoneyRaised} rank={index + 4} key={index} />)
      ) : (
        <p className='text-center p-2'>No other users yet!</p>
      )}
      <div ref={lastElementRef} className='z-[-1] text-center w-full h-[600px] mt-[-600px]'></div>
    </div>
  );
};
