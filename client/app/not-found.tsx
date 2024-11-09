import { Home } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className='h-screen w-full'>
      <div className='mx-auto grid h-full w-max place-items-center'>
        <div className='glass-effect fade-in rounded-md px-14 py-4 text-center'>
          <p className='font-semibold'>page not found :(</p>
          <Link href='/'>
            <button className='relative mt-2 rounded-md bg-blue-500 px-2 py-1 no-underline transition hover:bg-blue-600'>
              <div className='grid grid-cols-[auto_max-content] place-items-center gap-1'>
                <Home className='h-4 w-4 text-white' />
                <span className='text-white'>Return home</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
