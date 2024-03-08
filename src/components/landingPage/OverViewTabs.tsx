import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import ItemsTab from './ItemsTab';

import useLocalForage from '../../hooks/useLocalForage';
import MobilizationTab from './MobilizationTab';
export type Tabs = 'Mob' | 'DeMob' | 'Items';

export interface Film {
    title: string;
    year: number;
}

export type RecentOrSearch = 'recent' | 'search';

const OverViewTabs = () => {
    //const [value, setValue] = React.useState<Tabs>('Mob');
    const [latestUsedTab, setHandleSetLatestUsedTab] = useLocalForage<Tabs | null>('tab', null);

    const handleTabChange = (_: React.SyntheticEvent, newValue: Tabs) => {
        setHandleSetLatestUsedTab('tab', newValue);
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
