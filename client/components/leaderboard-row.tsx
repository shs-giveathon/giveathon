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
    <Link href={`/profile/${email}`}>
      <div className='border-b-2 mb-1'>
        <div className='flex justify-between'>
          <h1 className='font-semibold'>{rank}.</h1>
          <h1 className='ml-5 text-green-600'>${moneyRaised}</h1>
          <h1>{name}</h1>
        </div>
      </div>
    </Link>
  );
};
