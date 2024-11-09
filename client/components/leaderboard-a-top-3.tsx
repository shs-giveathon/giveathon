import Link from 'next/link';
import { FC } from 'react';

export interface LeaderboardAffilationRowProps {
  name: string;
  moneyRaised: number;
  rank: number;
  animationDelay?: number;
}

export const LeaderboardAffilationTop3: FC<LeaderboardAffilationRowProps> = ({ name, moneyRaised, rank, animationDelay }) => {
  const place = ['1st', '2nd', '3rd'];
  const emoji = ['🥇', '🥈', '🥉'];

  return (
    <Link href={`/affiliation/${name}`}>
      <div className='fade-in glass-effect grid h-full grid-flow-row rounded-lg p-1 md:p-4 lg:p-6' style={{ animationDelay: `${animationDelay ? animationDelay : 0}ms` }}>
        <h2 className='text-center text-4xl font-bold md:text-5xl lg:text-6xl'>{emoji[rank - 1]}</h2>
        <h3 className='font-headers mt-2 text-center text-2xl md:text-3xl lg:text-5xl'>{place[rank - 1]} Place</h3>
        <div className='mt-auto'>
          <h2 className='mt-1 text-center text-xl font-bold text-green-500 md:text-2xl lg:mt-4 lg:text-4xl'>${moneyRaised.toFixed(2)}</h2>
          <h4 className='mt-1 text-center text-xs md:text-sm lg:mt-4 lg:text-xl'>{name}</h4>
        </div>
      </div>
    </Link>
  );
};
