import { Box, Grid, Typography } from '@mui/material';
import { Part } from '../../../pages/part/ChecklistTemplateDetailsPage';

interface Props {
    title: string;
    part: Part;
    checklistItemId: string;
    mobilizationId: string;
}

const PunchesPageHeader = ({ part, title, checklistItemId, mobilizationId }: Props) => {
    return (
        <Box marginTop={'2rem'}>
            <Typography variant="h4">{title.toUpperCase()}</Typography>
            <Grid container marginTop={'0.5rem'}>
                <Grid item flexGrow={1} display={'flex'} flexDirection={'column'} gap={2}>
                    {/* <Typography variant="body1"> */}

                    <Box>
                        <b>part-Id</b>: {part.id}
                    </Box>
                    <Box>
                        <b>part name</b>: {part.name}
                    </Box>
                    <Box>
                        <b>part type</b>: {part.type.toUpperCase()}
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
                        <b>{part.partOf?.type.toUpperCase()}</b>
                    </Box>
                    <Box>{part.partOf?.partId}</Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PunchesPageHeader;
