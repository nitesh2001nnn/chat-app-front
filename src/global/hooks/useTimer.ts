import { useEffect, useState } from 'react';

interface timerProps {

    formattedTime: string;
    isExpired: boolean;
}

const UseTimer = (initialSeconds: number): timerProps => {
    const [timer, setTimer] = useState<number>(initialSeconds);

    useEffect(() => {
        if (!timer) return;

        const newTimer = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000)

        return () => clearInterval(newTimer)
    }, [timer])

    const formatTime = (timer: number) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return { formattedTime: formatTime(timer), isExpired: timer <= 0 }


}

export default UseTimer;
