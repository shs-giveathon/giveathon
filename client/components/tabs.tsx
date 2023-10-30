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
          <button className='bg-blue-500 hover:bg-blue-600 transition p-1 rounded-md'>Users</button>
        </Link>
        <Link href='/leaderboards/affiliations'>
          <button className='bg-blue-500 hover:bg-blue-600 transition p-1 rounded-md'>Affiliations</button>
        </Link>
      </div>
    </div>
  );
};
