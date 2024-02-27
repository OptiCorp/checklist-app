import { Box, Button, Grid, Typography } from '@mui/material';
import { Part } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

interface Props {
    part: Part;
    children?: JSX.Element;
}

const PartTopHeader = ({ part, children }: Props) => {
    const navigate = useNavigate();
    return (
        <Box marginTop={'2rem'}>
            <Grid container>
                <Grid item flexGrow={1}>
                    <Typography variant="h4">{part.type.toUpperCase()}</Typography>
                    {/* <Typography variant="body1"> */}
                    <Box>
                        <Box>
                            <b>part-Id</b>: {part.id}
                        </Box>
                        <Box>
                            <b>part name</b>: {part.name}
                        </Box>
                    </Box>
                    {/* </Typography> */}
                </Grid>
                <Grid item>{children}</Grid>
            </Grid>
        </Box>
    );
};

export default PartTopHeader;
