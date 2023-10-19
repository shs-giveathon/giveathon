import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className='h-screen w-full'>
      <div className='w-max mx-auto grid place-items-center h-full'>
        <div className='glass-effect fade-in py-4 px-14 text-center rounded-md'>
          <p>page not found :(</p>
          <Link href='/'>
            <p className='hover:text-blue-500 transition'>return home?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
