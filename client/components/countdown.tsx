'use client';

import { FC, useState, useEffect } from 'react';

export const Countdown: FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfNovember2023 = new Date(2023, 10, 30, 23, 59, 59); // November
    const difference = endOfNovember2023.getTime() - now.getTime();

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (difference > 0) {
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((difference / 1000 / 60) % 60);
      seconds = Math.floor((difference / 1000) % 60);
    }

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className='glass-effect fade-in rounded-md p-2 w-max mx-auto'>
      <div className='grid grid-flow-col'>
        <div>
          <p className='text-6xl md:text-8xl'>{timeLeft.days}</p>
          <p className='text-xs sm:text-md text-center'>DAYS</p>
        </div>
        <p className='text-6xl md:text-8xl'>:</p>
        <div>
          <p className='text-6xl md:text-8xl'>{timeLeft.hours.toString().padStart(2, '0')}</p>
          <p className='text-xs sm:text-md text-center'>HOURS</p>
        </div>
        <p className='text-6xl md:text-8xl'>:</p>
        <div>
          <p className='text-6xl md:text-8xl'>{timeLeft.minutes.toString().padStart(2, '0')}</p>
          <p className='text-xs sm:text-md text-center'>MINUTES</p>
        </div>
        <p className='text-6xl md:text-8xl'>:</p>
        <div>
          <p className='text-6xl md:text-8xl'>{timeLeft.seconds.toString().padStart(2, '0')}</p>
          <p className='text-xs sm:text-md text-center'>SECONDS</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
