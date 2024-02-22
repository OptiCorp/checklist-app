import { Box } from '@mui/material';
import React from 'react';
import PartTopHeader from '../../components/Part/PartTopHeader';
import { Part } from '../../utils/types';
import PartDetailsPageMain from '../../components/Part/PartDetailsPageMain';

const dummyPart: Part = {
    itemId: '31232',
    id: 'aslkd-12-lsad-a',
    created: new Date(),
    lastModified: new Date(),
    hasChecklistTemplate: true,
    name: 'Geir2.0',
    partTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

const PartDetailsPage = () => {
    return (
        <>
            <PartTopHeader part={dummyPart} showAddChecklistTemplateButton={true}></PartTopHeader>
            <PartDetailsPageMain></PartDetailsPageMain>
        </>
    );
};

export default PartDetailsPage;
