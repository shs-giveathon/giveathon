import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface TabsProps {
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ className }) => {
  return (
    <div className={cn('fade-in glass-effect rounded-lg p-2 grid place-items-center', className)}>
      <div className='grid grid-flow-col gap-2 w-max place-items-center '>
        <Link href='/leaderboards/users'>
          <button className='bg-gray-500 hover:bg-gray-600 transition py-1 px-2 rounded-md'>Users</button>
        </Link>
        <Link href='/leaderboards/affiliations'>
          <button className='bg-gray-500 hover:bg-gray-600 transition py-1 px-2  rounded-md'>Affiliations</button>
        </Link>
      </div>
    </div>
  );
};
