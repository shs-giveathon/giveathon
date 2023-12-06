'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu, User, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { isGiveathon } from '@/app/page';

const navItems = [
  {
    path: '/leaderboards/users',
    name: 'Users',
    icon: <User className='w-4 h-4 text-white' />
  },
  {
    path: '/leaderboards/affiliations',
    name: 'Affiliations',
    icon: <Users className='w-4 h-4 text-white' />
  }
];

export const Navbar: FC = () => {
  const pathname = usePathname() || '/';

  if (!isGiveathon) return;
  return (
    <div className='glass-effect !border-x-0 !border-t-0 py-2 px-4 w-full flex gap-2 fixed z-50'>
      <div className='hidden md:grid grid-cols-[max-content_auto] w-full place-items-center'>
        <div className='grid grid-flow-col gap-2 place-items-center'>
          {navItems.map(item => {
            const isActive = item.path === pathname;

            return (
              <Link key={item.path} className={cn('px-2 py-1 rounded-md relative no-underline transition', isActive && 'bg-gray-500')} data-active={isActive} href={item.path}>
                <div className='grid grid-cols-[max-content_auto] gap-1 place-items-center text-white'>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link target='_blank' href='https://docs.google.com/document/d/1-fvu3G89BqQeepY1A9rA0Iz72FGM8v1svccmArKnPLk/edit?usp=sharing' className='ml-auto'>
          <button className='px-2 py-1 rounded-md relative no-underline bg-emerald-500 hover:bg-emerald-600 transition'>
            <div className='grid grid-cols-[auto_max-content] gap-1 place-items-center'>
              <span>Submit Fundraising</span>
              <ExternalLink className='w-4 h-4 text-white' />
            </div>
          </button>
        </Link>
      </div>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger className='grid place-items-center'>
            <div>
              <Menu className='text-white w-6 h-6' />
            </div>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[420px] glass-effect text-white'>
            <SheetHeader>
              <SheetTitle className='text-white'>Navigation</SheetTitle>
            </SheetHeader>
            <div>
              <div className='grid grid-flow-row gap-2'>
                {navItems.map(item => {
                  return (
                    <SheetClose asChild key={`mobile-${item.path}`}>
                      <Link href={item.path}>
                        <div className='grid grid-cols-[max-content_auto] gap-2 place-items-center w-max'>
                          {item.icon}
                          <span className='text-white'>{item.name}</span>
                        </div>
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link target='_blank' href='https://docs.google.com/document/d/1-fvu3G89BqQeepY1A9rA0Iz72FGM8v1svccmArKnPLk/edit?usp=sharing'>
                    <div className='grid grid-cols-[max-content_auto] gap-2 place-items-center w-max'>
                      <ExternalLink className='w-4 h-4 text-white' />
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
