import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface TabsProps {
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ className }) => {
  return (
    <div className={cn('fade-in glass-effect grid place-items-center rounded-lg p-2', className)}>
      <div className='grid w-max grid-flow-col place-items-center gap-2 '>
        <Link href='/leaderboards/users'>
          <button className='rounded-md bg-gray-500 px-2 py-1 transition hover:bg-gray-600'>Users</button>
        </Link>
        <Link href='/leaderboards/affiliations'>
          <button className='rounded-md bg-gray-500 px-2 py-1 transition  hover:bg-gray-600'>Affiliations</button>
        </Link>
      </div>
    </div>
  );
};
