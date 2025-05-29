import { useRef } from "react";

function useDebounce(callback, delay) {
    const timeoutRef = useRef(null);
    const isCooldownRef = useRef(false); 

    return function (...args) {
        if (!isCooldownRef.current) {
            callback(...args);
            isCooldownRef.current = true;
            timeoutRef.current = setTimeout(() => {
                isCooldownRef.current = false;
            }, delay);
        }
    };
}

export default useDebounce;