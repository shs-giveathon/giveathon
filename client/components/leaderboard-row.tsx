import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

export interface LeaderboardRowProps {
  name: string;
  email: string;
  moneyRaised: number;
  rank: number;
}

export const LeaderboardRow: FC<LeaderboardRowProps> = ({ name, email, moneyRaised, rank }) => {
  return (
    <Link href={`/user/${email}`}>
      <div className={cn('mb-1 grid grid-cols-[1fr_max-content_1fr] p-2 rounded-md', rank % 2 === 0 && 'bg-black/20')}>
        <div>
          <h1 className='font-headers mr-auto'>{rank}.</h1>
        </div>
        <div>
          <h1 className=' text-green-500 text-center'>${moneyRaised.toFixed(2)}</h1>
        </div>
        <h1 className='ml-auto text-xs mt-2 sm:mt-0 sm:text-xl'>{name}</h1>
      </div>
    </Link>
  );
};
