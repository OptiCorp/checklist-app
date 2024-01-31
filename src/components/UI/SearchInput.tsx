import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
    loading: boolean;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SearchInput = ({ loading, placeHolder, onChange }: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
            <TextField
                fullWidth
                placeholder={placeHolder}
                variant="standard"
                onChange={onChange}
                InputProps={{
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {/* {params.InputProps.endAdornment} */}
                        </React.Fragment>
                    ),
                }}
            ></TextField>
        </Box>
    );
};

export default SearchInput;
