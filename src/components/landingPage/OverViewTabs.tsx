import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from '../UI/SearchInput';
import ItemsTab from './ItemsTab';

import MobilizationTab from './MobilizationTab';
import useLatestTabHook from '../../hooks/useLatestTabHook';
export type Tabs = 'Mob' | 'DeMob' | 'Items';

export interface Film {
    title: string;
    year: number;
}

export type RecentOrSearch = 'recent' | 'search';

const OverViewTabs = () => {
    //const [value, setValue] = React.useState<Tabs>('Mob');
    const [latestUsedTab, setHandleSetLatestUsedTab] = useLatestTabHook('Mob');

    console.log(latestUsedTab);

    const handleTabChange = (_: React.SyntheticEvent, newValue: Tabs) => {
        setHandleSetLatestUsedTab(newValue);
    };

    return (
        <>
            <Box>
                <Tabs
                    value={latestUsedTab ? latestUsedTab : 'Mob'}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="Mob" label="Mob" />
                    <Tab value="DeMob" label="DeMob" />
                    <Tab value="Items" label="Items" />
                </Tabs>
            </Box>

            {latestUsedTab && (
                <Box sx={{ mt: 5 }}>
                    {latestUsedTab == 'Mob' && <MobilizationTab></MobilizationTab>}
                    {latestUsedTab == 'DeMob' && <MobilizationTab></MobilizationTab>}
                    {latestUsedTab == 'Items' && <ItemsTab></ItemsTab>}
                </Box>
            )}
        </>
    );
};

export default OverViewTabs;
