import Link from 'next/link';
import { FC } from 'react';

export interface LeaderboardTop3Props {
  name: string;
  email: string;
  moneyRaised: number;
  rank: number;
  animationDelay?: number;
}

export const LeaderboardTop3: FC<LeaderboardTop3Props> = ({ name, email, moneyRaised, rank, animationDelay }) => {
  const place = ['1st', '2nd', '3rd'];
  const emoji = ['🥇', '🥈', '🥉'];

  return (
    <Link href={`/user/${email}`}>
      <div className='fade-in glass-effect p-1 md:p-4 lg:p-6 rounded-lg' style={{ animationDelay: `${animationDelay ? animationDelay : 0}ms` }}>
        <h2 className='text-center text-4xl md:text-5xl lg:text-6xl font-bold'>{emoji[rank - 1]}</h2>
        <h3 className='font-headers mt-2 text-center text-2xl md:text-3xl lg:text-5xl font-bold'>{place[rank - 1]} Place</h3>
        <h2 className='mt-1 lg:mt-4 text-center text-xl md:text-2xl lg:text-4xl text-green-500 font-bold'>${moneyRaised.toPrecision(4) /* round to 4 didgets */}</h2>
        <h4 className='mt-1 lg:mt-4 text-center text-xs md:text-sm lg:text-xl'>{name}</h4>
      </div>
    </Link>
  );
};
