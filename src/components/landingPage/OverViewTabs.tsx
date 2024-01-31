import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from '../UI/SearchInput';
import Items from './Items';
import Mobilization from './Mobilization';

import { debounce } from 'lodash';

//TODO: missing scroll on the autocomplete

type Tabs = 'Mob' | 'DeMob' | 'Items';

export interface Film {
    title: string;
    year: number;
}

export type RecentOrSearch = 'recent' | 'search';

const OverViewTabs = () => {
    const [value, setValue] = React.useState<Tabs>('Mob');
    const [inputSearch, setInputSearch] = useState('');
    // const [mobOptions, setMobOptions] = React.useState<readonly Film[]>([]);
    // const [deMobOptions, setDeMobOptions] = React.useState<readonly Film[]>([]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: Tabs) => {
        console.log(event);
        setValue(newValue);
        //setInputSearch('');
    };

    const debouncedSearch = React.useRef(
        debounce((criteria: string) => {
            setInputSearch(criteria);
        }, 300)
    ).current;

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        debouncedSearch(e.target.value);
    }

    console.log(inputSearch);

    return (
        <>
            {/* <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'InactiveBorder' }}> */}

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
                <SearchInput
                    loading={false}
                    placeHolder="Search: id, name"
                    onChange={handleSearchChange}
                ></SearchInput>
            </Box>
            <Box sx={{ mt: 5 }}>
                {value == 'Mob' && <Mobilization></Mobilization>}
                {value == 'DeMob' && <Mobilization></Mobilization>}
                {value == 'Items' && <Items></Items>}
            </Box>
        </>
    );
};

export default OverViewTabs;
