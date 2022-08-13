import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const userData = localStorage.getItem(key);

        return userData ? JSON.parse(userData) : defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))

        setValue(newValue)
    }; 


    return [
        value,
        setLocalStorageValue,
    ]
}

