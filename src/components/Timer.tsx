import { useState, useEffect } from "react";

interface Props{
  stopped: boolean;
}

export default function Timer({stopped }:Props) {
    const [seconds, setSeconds] = useState<number>(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (!stopped) {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [stopped]);
  
    return <h2>Seconds: {seconds}</h2>;
  };