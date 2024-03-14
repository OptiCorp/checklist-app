import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    includeClearIcon: boolean;
    helperText?: string;
    error: boolean;
    IconClick?: () => void;
    value?: string;
    rows?: number;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    disabeldPropButton?: boolean;
}

const TextInput = ({
    placeHolder,
    onChange,
    IconClick,
    value,
    includeClearIcon,
    rows,
    disabled,
    helperText,
    error,
    onBlur,
    disabeldPropButton,
}: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                onBlur={onBlur}
                fullWidth
                placeholder={placeHolder}
                variant="standard"
                onChange={onChange}
                error={error}
                // sx={{ bgcolor: '#e0e0e0' }}
                value={value}
                helperText={helperText}
                type="text"
                rows={rows}
                maxRows={rows ? undefined : 3}
                disabled={disabled}
                InputProps={
                    includeClearIcon
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          onClick={IconClick}
                                          color="secondary"
                                          disabled={disabled || disabeldPropButton}
                                      >
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
