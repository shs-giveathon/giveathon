'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu, User, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import isGiveathon from '@/utils/isGiveathon';

const navItems = [
  {
    path: '/leaderboards/users',
    name: 'Users',
    icon: <User className='h-4 w-4 text-white' />
  },
  {
    path: '/leaderboards/affiliations',
    name: 'Affiliations',
    icon: <Users className='h-4 w-4 text-white' />
  }
];

export const Navbar: FC = () => {
  const pathname = usePathname() || '/';

  if (!isGiveathon) return;
  return (
    <div className='glass-effect fixed z-50 flex w-full gap-2 !border-x-0 !border-t-0 px-4 py-2'>
      <div className='hidden w-full grid-cols-[max-content_auto] place-items-center md:grid'>
        <div className='grid grid-flow-col place-items-center gap-2'>
          {navItems.map(item => {
            const isActive = item.path === pathname;

            return (
              <Link
                key={item.path}
                className={cn('relative rounded-md px-2 py-1 no-underline transition', isActive && 'bg-yellow-400')}
                data-active={isActive}
                href={item.path}
              >
                <div className='grid grid-cols-[max-content_auto] place-items-center gap-1 text-white'>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link target='_blank' href='https://docs.google.com/document/d/1lJrROnj5CDimESUEUlfRy6Mz8D6m8osyQiA6KOZYgMY/edit?tab=t.0' className='ml-auto'>
          <button className='relative rounded-md bg-emerald-500 px-2 py-1 no-underline transition hover:bg-emerald-600'>
            <div className='grid grid-cols-[auto_max-content] place-items-center gap-1'>
              <span>Submit Fundraising</span>
              <ExternalLink className='h-4 w-4 text-white' />
            </div>
          </button>
        </Link>
      </div>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger className='grid place-items-center'>
            <div>
              <Menu className='h-6 w-6 text-white' />
            </div>
          </SheetTrigger>
          <SheetContent side='left' className='glass-effect w-[300px] text-white sm:w-[420px]'>
            <SheetHeader>
              <SheetTitle className='text-white'>Navigation</SheetTitle>
            </SheetHeader>
            <div>
              <div className='grid grid-flow-row gap-2'>
                {navItems.map(item => {
                  return (
                    <SheetClose asChild key={`mobile-${item.path}`}>
                      <Link href={item.path}>
                        <div className='grid w-max grid-cols-[max-content_auto] place-items-center gap-2'>
                          {item.icon}
                          <span className='text-white'>{item.name}</span>
                        </div>
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link target='_blank' href='https://docs.google.com/document/d/1-fvu3G89BqQeepY1A9rA0Iz72FGM8v1svccmArKnPLk/edit?usp=sharing'>
                    <div className='grid w-max grid-cols-[max-content_auto] place-items-center gap-2'>
                      <ExternalLink className='h-4 w-4 text-white' />
                      <span className='text-white'>Submit Fundraising</span>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
