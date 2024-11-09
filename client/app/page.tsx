import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import isGiveathon from '@/utils/isGiveathon';

const Home: NextPage = () => {
  if (isGiveathon) {
    return redirect('/leaderboards/affiliations');
  } else {
    return (
      <>
        <div className='h-screen w-full pt-12'>
          <div className='fade-in glass-effect font-headers mx-auto mt-4 w-1/2 rounded-lg text-center text-3xl font-bold md:text-4xl lg:text-6xl'>GiveAThn 2023</div>{' '}
          {/* unknown character is unique to this font - for styling purposes only */}
          <div className='m-auto mt-4 grid grid-flow-row gap-2 md:mt-8 md:w-[80%]'>
            <div className='glass-effect fade-in rounded-md p-4 text-center'>
              <h1 className='text-3xl'>Thank you for participating in Give-A-Thon 2023! This year we...</h1>
              <p className='mt-6 text-2xl'>&bull; helped 306 families</p>
              <p className='mt-2 text-2xl'>&bull; supported 1,189 children with gifts</p>
              <p className='mt-2 text-2xl'>&bull; gave 68 bikes</p>
              <p className='mt-2 text-2xl'>&bull; donated 195 boxes of food</p>
              <p className='mt-2 text-2xl'>&bull; provided 103 boxes of diapers and wipes</p>
              <h1 className='mt-6 text-4xl'>
                Together, we fundraised a total of <span className='font-bold text-green-500'>$30,594.23</span>!
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
