import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);

        try {
            // Check if localStorageValue is valid JSON
            const parsedValue = JSON.parse(localStorageValue);
            // Return parsedValue if it's valid JSON, otherwise return defaultValue
            return localStorageValue !== null ? parsedValue : defaultValue;
        } catch (error) {
            console.error("Error parsing localStorage value:", error);
            // If there's an error parsing JSON, return defaultValue
            return defaultValue;
        }
    });

    useEffect(() => {
        // Update localStorage when value changes
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export { useLocalState };
