import localforage from 'localforage';
import { useCallback, useEffect, useState } from 'react';

function useLocalForage<T>(key: string, initialValue: T): [T, (key: string, value: T) => void] {
    const [value, setValue] = useState<T>(initialValue);

    const updateValue = useCallback((key: string, value: T) => {
        setValue(value);
        localforage
            .setItem(key, value)
            .catch((err) => console.log('Error setting datain localForage', err));
    }, []);

    useEffect(() => {
        localforage
            .getItem(key)
            .then((data) => {
                if (!data) {
                    return updateValue(key, initialValue);
                } else {
                    return updateValue(key, data as T);
                }
            })
            .catch((error) => {
                console.error('Error retrieving data from localforage:', error);
            });
        // return () => {};
    }, [key, initialValue]);

    return [value, updateValue];
}

export default useLocalForage;
