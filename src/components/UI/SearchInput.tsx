import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
    loading: boolean;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    clearSearch: () => void;
    value: string;
}

const SearchInput = ({ loading, placeHolder, onChange, clearSearch, value }: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
            <TextField
                fullWidth
                placeholder={placeHolder}
                variant="standard"
                onChange={onChange}
                value={value}
                InputProps={{
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {/* {params.InputProps.endAdornment} */}
                            {value != '' && !loading && (
                                <IconButton onClick={clearSearch} size={'small'}>
                                    <ClearIcon fontSize={'inherit'} />
                                </IconButton>
                            )}
                        </React.Fragment>
                    ),
                }}
            ></TextField>
        </Box>
    );
};

export default SearchInput;
