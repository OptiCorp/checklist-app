import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface Props {
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    IconClick: () => void;
    value?: string;
}

const TextInput = ({ placeHolder, onChange, IconClick, value }: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                placeholder={placeHolder}
                variant="standard"
                onChange={onChange}
                sx={{ bgcolor: '#e0e0e0' }}
                value={value}
                multiline
                maxRows={3}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={IconClick}>
                                <ClearOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            ></TextField>
        </Box>
    );
};

export default TextInput;
