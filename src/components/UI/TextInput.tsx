import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    includeClearIcon: boolean;
    IconClick?: () => void;
    value?: string;
    rows?: number;
    disabled?: boolean;
}

const TextInput = ({
    placeHolder,
    onChange,
    IconClick,
    value,
    includeClearIcon,
    rows,
    disabled,
}: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                placeholder={placeHolder}
                variant="standard"
                onChange={onChange}
                sx={{ bgcolor: '#e0e0e0' }}
                value={value}
                type="text"
                rows={rows}
                maxRows={rows ? undefined : 3}
                disabled={disabled}
                InputProps={
                    includeClearIcon
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={IconClick}>
                                          <ClearOutlinedIcon />
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : undefined
                }
            ></TextField>
        </Box>
    );
};

export default TextInput;
