import Link from 'next/link';
import { FC } from 'react';

export interface LeaderboardAffiliationRowProps {
  name: string;
  moneyRaised: number;
  rank: number;
}

export const LeaderboardAffiliationRow: FC<LeaderboardAffiliationRowProps> = ({ name, moneyRaised, rank }) => {
  return (
    <Link href={`/affiliation/${name}`}>
      <div className='border-b-2 mb-1'>
        <div className='flex justify-between'>
          <h1 className='font-headers font-semibold'>{rank}.</h1>
          <h1 className='ml-5 text-green-600'>${moneyRaised.toFixed(2)}</h1>
          <h1>{name}</h1>
        </div>
      </div>
    </Link>
  );
};
