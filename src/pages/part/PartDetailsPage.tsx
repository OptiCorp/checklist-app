import { Button, Typography } from '@mui/material';
import PartDetailsPageMain from '../../components/Part/PartDetailsPageMain';
import PartTopHeader from '../../components/Part/PartTopHeader';
import { Part } from '../../utils/types';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    return (
        <>
            <PartTopHeader part={dummyPart}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => navigate('/checklistTemplate')}
                >
                    <Typography variant="body2">Edit checklist template</Typography>
                </Button>
            </PartTopHeader>
            <PartDetailsPageMain></PartDetailsPageMain>
        </>
    );
};

export default PartDetailsPage;
