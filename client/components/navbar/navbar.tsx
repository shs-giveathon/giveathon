'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navItems = [
  {
    path: '/leaderboards/users',
    name: 'Users'
  },
  {
    path: '/leaderboards/affiliations',
    name: 'Affiliations'
  }
];

export const Navbar: FC = () => {
  const pathname = usePathname() || '/';

  return (
    <div className='glass-effect !border-x-0 !border-t-0 py-2 px-4 w-full flex gap-2 fixed z-50'>
      <div className='grid grid-flow-col place-items-center'>
        <div className='grid grid-flow-col gap-2 place-items-center'>
          <Link href='/'>
            <div className='text-white p-1 transition rounded-md'>
              <Home className='w-5 h-5' />
            </div>
          </Link>
          {navItems.map(item => {
            const isActive = item.path === pathname;

            return (
              <Link
                key={item.path}
                className={cn('px-2 py-1 rounded-md relative no-underline duration-300 ease-in', isActive && 'bg-gray-500')}
                data-active={isActive}
                href={item.path}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
