import { Typography } from '@mui/material';
import React from 'react';
import TextInput from '../UI/TextInput';
import SearchInput from '../UI/SearchInput';

//TODO: get input search field and list checklistTemplates to see history for the part.
//TODO: when no checklistTemplate, show missing checklistTemplate
const PartDetailsPageMain = () => {
    return (
        <>
            <Typography variant="h4">History</Typography>
            <SearchInput loading={false} onChange={() => {}} placeHolder="search"></SearchInput>
        </>
    );
};

export default PartDetailsPageMain;
