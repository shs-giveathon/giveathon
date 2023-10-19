'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Candy, ChevronRight } from 'lucide-react';
import Path from '@/components/navbar/path';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Navbar: FC = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/');

  return (
    <div className='glass-effect py-2 px-4 w-full flex gap-2 fixed z-50'>
      <div className='grid grid-flow-col place-items-center'>
        <div className='grid grid-flow-col gap-2 place-items-center'>
          <Link href='/'>
            <div className='text-white p-1 transition rounded-md'>
              <Candy className='w-5 h-5' />
            </div>
          </Link>
          {pathname !== '/' && <ChevronRight className='w-4 h-4 text-white' />}
        </div>
        {pathnames.map((path, index) => {
          let routeTo = `${pathnames.slice(0, index + 1).join('/')}`;

          if (routeTo === '' || routeTo === '/') return null;

          return (
            <div className={cn('grid grid-flow-col place-items-center gap-2', index !== 0 && 'ml-2')} key={path}>
              <Path path={path} route={routeTo} />
              {index !== 0 && index !== pathnames.length - 1 && <ChevronRight className='w-4 h-4 text-white' />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
