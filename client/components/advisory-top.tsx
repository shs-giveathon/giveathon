'use client';

import { FC } from 'react';

export const AdvisoryTop: FC = () => {
  return (
    <div className='glass-effect fade-in mx-auto mt-4 rounded-lg p-4 text-center'>
      <h2 className='mb-2 text-2xl font-bold'>Mac and Cheese Winners</h2>
      <div className='flex flex-row justify-center gap-2'>
        <div className='flex flex-col items-center justify-between rounded-lg bg-black/20 px-4 py-2 shadow-lg'>
          <div className='text-left text-white'>
            <div className='text-xl font-bold'>4th Period</div>
            <div className='text-lg'>MacLennan</div>
            <div className='text-md'>10 boxes</div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between rounded-lg bg-black/20 px-4 py-2 shadow-lg'>
          <div className='text-left text-white'>
            <div className='text-xl font-bold'>5th Period</div>
            <div className='text-lg'>Jurkowski</div>
            <div className='text-md'>72 boxes</div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between rounded-lg bg-black/20 px-4 py-2 shadow-lg'>
          <div className='text-left text-white'>
            <div className='text-xl font-bold'>6th Period</div>
            <div className='text-lg'>Scott</div>
            <div className='text-md'>70 boxes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryTop;
