import { useEffect, useState } from "react";


function Count() {
    const [count, setCount] = useState(60);
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [count]);
    return count
}

function Enable() {
    var [enable, setEnable] = useState(false)
    function toggle() {
        setEnable(true)
    }
    setTimeout(() => {
        toggle()
    }, 60000);
    return enable
}

export { Count, Enable }