import { Button, Typography } from '@mui/material';
import ItemDetailsPageMain from '../../components/Item/ItemDetailsPageMain';
import ItemTopHeader from '../../components/Item/ItemTopHeader';
import { Item } from '../../utils/types';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';

const dummyItem: Item = {
    itemId: '31232',
    id: 'aslkd-12-lsad-a',
    created: new Date(),
    lastModified: new Date(),
    hasChecklistTemplate: true,
    name: 'Geir2.0',
    itemTemplateId: '9391293',
    serialNumber: '131233',
    type: 'item',
    wpId: '1231232',
};

const ItemDetailsPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <ItemTopHeader item={dummyItem}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => navigate('/checklistTemplate')}
                >
                    <Typography variant="body2">Edit checklist template</Typography>
                </Button>
            </ItemTopHeader>
            <ItemDetailsPageMain></ItemDetailsPageMain>
        </>
    );
};

export default ItemDetailsPage;
