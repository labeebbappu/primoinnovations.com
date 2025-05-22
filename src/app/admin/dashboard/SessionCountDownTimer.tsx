"use client";

import { useEffect, useState } from "react";

interface SessionCountDownTimerProps {
  expiresAt: string | Date;
}

export default function SessionCountDownTimer({ expiresAt }: SessionCountDownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Convert expiresAt to a Date object if it's a string
    const expirationDate = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
    
    const calculateTimeLeft = () => {
      const difference = expirationDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // Session has expired
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="text-sm text-gray-600 flex items-center space-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Session expires in: </span>
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      <span>
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );}
