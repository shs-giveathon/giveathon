import { cn } from '@/lib/utils';
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
      <div className={cn('mb-1 grid grid-cols-[1fr_max-content_1fr] p-2 rounded-md', rank % 2 === 0 && 'bg-black/20')}>
        <div>
          <h1 className='font-headers font-semibold mr-auto'>{rank}.</h1>
        </div>
        <div>
          <h1 className=' text-green-500 text-center'>${moneyRaised.toFixed(2)}</h1>
        </div>
        <h1 className='ml-auto text-xs mt-2 sm:mt-0 sm:text-xl'>{name}</h1>
      </div>
    </Link>
  );
};
