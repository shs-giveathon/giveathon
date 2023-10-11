import Link from 'next/link';
import { FC } from 'react';

export interface LeaderboardTop3Props {
  name: string;
  email: string;
  moneyRaised: number;
  rank: number;
}

export const LeaderboardTop3: FC<LeaderboardTop3Props> = ({ name, email, moneyRaised, rank }) => {
  const place = ['1st', '2nd', '3rd'];
  const emoji = ['🥇', '🥈', '🥉'];

  return (
    <Link href={`/profile/${email}`}>
      <div className='backdrop-blur-md bg-white/25 p-6 shadow-lg rounded-lg mr-10'>
        <h2 className='text-center text-6xl font-bold'>{emoji[rank - 1]}</h2>
        <h3 className='font-headers mt-2 text-center text-5xl font-bold'>{place[rank - 1]} Place</h3>
        <h2 className='mt-4 text-center text-4xl text-green-500 font-bold'>${moneyRaised.toPrecision(4) /* round to 4 didgets */}</h2>
        <h4 className='mt-4 text-center text-xl'>{name}</h4>
      </div>
    </Link>
  );
};
