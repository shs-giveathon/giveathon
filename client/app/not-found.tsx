import { Home } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className='h-screen w-full'>
      <div className='w-max mx-auto grid place-items-center h-full'>
        <div className='glass-effect fade-in py-4 px-14 text-center rounded-md'>
          <p className='font-semibold'>page not found :(</p>
          <Link href='/'>
            <button className='mt-2 px-2 py-1 rounded-md relative no-underline bg-blue-500 hover:bg-blue-600 transition'>
              <div className='grid grid-cols-[auto_max-content] gap-1 place-items-center'>
                <Home className='w-4 h-4 text-white' />
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
