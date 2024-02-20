import { Box, IconButton, Tooltip, styled } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
    imageListWidth: number;
    editMode: boolean;
    fileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const PunchFileUpload: FC<Props> = ({ editMode, imageListWidth, fileUpload }) => {
    return (
        <Box width={imageListWidth} display={'flex'} justifyContent={'center'}>
            <Tooltip title="Upload images">
                <IconButton color="primary" disabled={!editMode} component={'label'}>
                    <AddCircleIcon fontSize="medium"></AddCircleIcon>
                    <VisuallyHiddenInput
                        type="file"
                        onChange={fileUpload}
                        accept=".jpeg,.png,.jpg"
                        multiple
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default PunchFileUpload;
