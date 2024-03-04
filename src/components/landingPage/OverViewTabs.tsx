import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from '../UI/SearchInput';
import ItemsTab from './ItemsTab';

import { debounce } from 'lodash';
import MobilizationTab from './MobilizationTab';

type Tabs = 'Mob' | 'DeMob' | 'Items';

export interface Film {
    title: string;
    year: number;
}

export type RecentOrSearch = 'recent' | 'search';

const OverViewTabs = () => {
    const [value, setValue] = React.useState<Tabs>('Mob');

    const handleTabChange = (event: React.SyntheticEvent, newValue: Tabs) => {
        console.log(event);
        setValue(newValue);
    };

    return (
        <>
            <Box>
                <Tabs
                    value={value}
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
            <Box sx={{ mt: 5 }}>
                {value == 'Mob' && <MobilizationTab></MobilizationTab>}
                {value == 'DeMob' && <MobilizationTab></MobilizationTab>}
                {value == 'Items' && <ItemsTab></ItemsTab>}
            </Box>
        </>
    );
};

export default OverViewTabs;
