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
      <div className='border-t-2 mb-1 flex'>
        <div className='w-1/3'>
          <h1 className='font-headers font-semibold'>{rank}.</h1>
        </div>
        <div className='w-1/3'>
          <h1 className=' text-green-500 text-center'>${moneyRaised.toFixed(2)}</h1>
        </div>
        <h1 className='ml-auto text-xs mt-2 sm:mt-0 sm:text-xl'>{name}</h1>
      </div>
    </Link>
  );
};
