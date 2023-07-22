import { useEffect, useState } from 'react';

export default function usePulse() {
    const [active, setActive] = useState(false);
    const [times, setTimes] = useState(0);
    const [wait, setWait] = useState(0);

    useEffect(() => {
        if (times > 0) {
            setActive(true);
            const timeoutId = setTimeout(() => {
                setActive(false);
            }, wait);

            return () => {
                setActive(false);
                clearTimeout(timeoutId);
            };
        }
    }, [times]);

    function pulse(timeout) {
        setWait(timeout);
        setTimes(times + 1);
    }

    return [ active, pulse ];
}
