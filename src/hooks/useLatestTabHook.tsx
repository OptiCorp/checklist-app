import React, { FC, useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';
import { Tabs } from '../components/landingPage/OverViewTabs';

// type Tabs = 'mobs' | 'demobs' | 'items' | undefined;

const useLatestTabHook = (defaultTab: Tabs): [Tabs | null, (setTab: Tabs) => void] => {
    const [latestUsedTab, setLatestUsedTab] = useState<Tabs | null>(null);

    const setHandleSetLatestUsedTabs = useCallback(async (setTab: Tabs) => {
        setLatestUsedTab(setTab as Tabs);
        try {
            await localforage.setItem('tab', setTab);
        } catch (error) {
            console.log('Error retrieving data', error);
        }
    }, []);

    useEffect(() => {
        localforage
            .getItem('tab')
            .then((data) => {
                if (!data) {
                    setHandleSetLatestUsedTabs(defaultTab).catch((err) => console.log(err));
                } else {
                    setHandleSetLatestUsedTabs(data as Tabs).catch((err) => console.log(err));
                }
            })
            .catch((error) => {
                console.error('Error retrieving data:', error);
            });
        // return () => {};
    }, [defaultTab]);

    return [latestUsedTab, setHandleSetLatestUsedTabs];
};

export default useLatestTabHook;
