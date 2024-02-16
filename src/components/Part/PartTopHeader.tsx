import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Part } from '../../pages/part/ChecklistTemplateDetailsPage';

interface Props {
    part: Part;
    showAddChecklistTemplateButton: boolean;
}

const PartTopHeader = ({ part, showAddChecklistTemplateButton }: Props) => {
    return (
        <Box marginTop={'2rem'}>
            <Grid container>
                <Grid item flexGrow={1}>
                    <Typography variant="h4">{part.type.toUpperCase()}</Typography>
                    {/* <Typography variant="body1"> */}
                    <Box>
                        <Box>
                            <b>part-Id</b>: {part.partId}
                        </Box>
                        <Box>
                            <b>part name</b>: {part.name}
                        </Box>
                    </Box>
                    {/* </Typography> */}
                </Grid>
                <Grid item>
                    {showAddChecklistTemplateButton && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                        >
                            <Typography variant="body2">Add checklist template</Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default PartTopHeader;