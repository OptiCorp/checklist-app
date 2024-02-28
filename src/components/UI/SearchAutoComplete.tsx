import SearchIcon from '@mui/icons-material/Search';
import {
    Autocomplete,
    AutocompleteInputChangeReason,
    Box,
    CircularProgress,
    TextField,
} from '@mui/material';

import React from 'react';
import { RecentOrSearch } from '../landingPage/OverViewTabs';

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

type GenericList<T> = readonly T[];

interface Props<T> {
    initOption: GenericList<T>;
    searchOptions: GenericList<T>;
    setOptions: (items: T[]) => void;
    isEqualToFunction: (option: T, value: T) => boolean;
    getOptionLabel: (option: T) => string;
    placeHolder: string;
    renderOption: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
    recentOrSearch: RecentOrSearch;
    handleChangeRecentOrSearch: (newOne: RecentOrSearch) => void;
    groupBy?: (option: T) => string;
    oneGotClicked: (item: T | null) => void;
}

function SearchAutoComplete<T>({
    searchOptions,
    setOptions,
    isEqualToFunction,
    getOptionLabel,
    initOption,
    placeHolder,
    renderOption,
    recentOrSearch,
    handleChangeRecentOrSearch,
    groupBy,
    oneGotClicked
}: Props<T>) {
    const [open, setOpen] = React.useState(false);
    const loading = open && searchOptions.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        void (async () => {
            await sleep(1e3); // For demo purposes.
            if (active) {
                setOptions([...initOption]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleInputChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (recentOrSearch == 'search') return;
        if (value != '' && recentOrSearch == 'recent') {
            handleChangeRecentOrSearch('search');
            // } else { //is empty
            //     if (recentOrSearch == 'search') {
            //         handleChangeRecentOrSearch('recent');
            //     }
        }
        console.log(value, reason);
    };

    return (
        <Autocomplete
            fullWidth
            id="size-small-standard"
            options={searchOptions}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                handleChangeRecentOrSearch('recent');
            }}
            loading={loading}
            isOptionEqualToValue={isEqualToFunction}
            onInputChange={handleInputChange}
            // defaultValue={top100Films[8]}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            onChange={(event: any, newValue: T | null) => {
                oneGotClicked(newValue);
            }}
            groupBy={groupBy}
            renderInput={(params) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon />
                    <TextField
                        {...params}
                        placeholder={placeHolder}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    ></TextField>
                </Box>
            )}
        ></Autocomplete>
    );
}

export default SearchAutoComplete;
