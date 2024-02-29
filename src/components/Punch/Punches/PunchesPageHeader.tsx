import { Box, Grid, Typography } from '@mui/material';
import { Item } from '../../../utils/types';

interface Props {
    title: string;
    item: Item;
    checklistItemId: string;
    mobilizationId: string;
}

const PunchesPageHeader = ({ item: item, title, checklistItemId, mobilizationId }: Props) => {
    return (
        <Box>
            <Typography variant="h4">{title.toUpperCase()}</Typography>
            <Grid container marginTop={'0.5rem'}>
                <Grid item flexGrow={1} display={'flex'} flexDirection={'column'} gap={2}>
                    {/* <Typography variant="body1"> */}

                    <Box>
                        <b>item-Id</b>: {item.id}
                    </Box>
                    <Box>
                        <b>item name</b>: {item.name}
                    </Box>
                    <Box>
                        <b>item type</b>: {item.type.toUpperCase()}
                    </Box>
                    <Box>
                        <b>Checklist-Id</b>: {checklistItemId}
                    </Box>
                    <Box>
                        <b>Mobilization-Id</b>: {mobilizationId}
                    </Box>

                    {/* </Typography> */}
                </Grid>
                <Grid item display={'flex'} flexDirection={'column'} gap={2}>
                    <Box>
                        <b>Part Of</b>:
                    </Box>
                    <Box>
                        <b>{item.partOf?.type.toUpperCase()}</b>
                    </Box>
                    <Box>{item.partOf?.itemId}</Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PunchesPageHeader;
