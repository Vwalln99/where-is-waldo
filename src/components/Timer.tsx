import { useState, useEffect } from "react";

export default function Timer() {
    const [seconds, setSeconds] = useState<number>(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return <h2>Timer: {seconds}</h2>;
  };