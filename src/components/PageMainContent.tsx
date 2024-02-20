import { Box } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    children: JSX.Element | JSX.Element[];
}

const PageMainContent: FC<Props> = ({ children }) => {
    return <Box sx={{ flex: 1 }}>{children}</Box>;
};

export default PageMainContent;
