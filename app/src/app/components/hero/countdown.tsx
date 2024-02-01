'use client';

import React from 'react';

const TimePill = ({ time, label }: { time: number; label: string }) => {
  return (
    <div className='relative aspect-square w-[72px] rounded-2xl border-2 border-[#fafafa93] md:w-[128px] md:rounded-3xl'>
      <div
        className='h-full w-full rounded-xl bg-[#f6f4f93c] md:rounded-2xl'
        style={{
          backdropFilter: 'blur(3px) opacity(50%)',
        }}
      />
      <div className='absolute top-0 flex h-full w-full flex-col items-center justify-center p-2'>
        <span className='text-3xl font-light text-slate-800 sm:text-4xl md:text-5xl'>
          {time <= 9 ? `0${time}` : time}
        </span>
        <span className='text-sm font-medium text-neutral-600 sm:text-lg md:text-xl'>
          {label}
        </span>
      </div>
    </div>
  );
};

const Countdown = () => {
  const targetDate = new Date(1710441000000);
  const [days, setDays] = React.useState<number>(0);
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [seconds, setSeconds] = React.useState<number>(0);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      // Timer has expired
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className='flex flex-row gap-4 py-4'>
      <TimePill time={days} label='Days' />
      <TimePill time={hours} label='Hours' />
      <TimePill time={minutes} label='Minutes' />
      <TimePill time={seconds} label='Seconds' />
    </div>
  );
};

export default Countdown;
