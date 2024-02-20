import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    IconButton,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Punch } from '../../../utils/types';

// export type Punch = {
//     id: string;
//     description: string;
//     title: string;
//     imageUrls: string[];
// };

const PunchCard = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,

    // lineHeight: '60px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.text.primary,
}));

interface Props {
    punches: Punch[];
    sasToken: string;
}

const PunchesMain: FC<Props> = ({ punches, sasToken }) => {
    const navigate = useNavigate();

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('delete this');
    };
    return (
        <Box marginTop={'1rem'}>
            <Typography variant="h4">Add punches</Typography>
            <Stack spacing={2} sx={{ marginTop: '0.5rem' }}>
                {punches.map((punch) => (
                    <PunchCard
                        key={punch.id}
                        sx={{
                            width: '60%',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <CardActionArea
                            onClick={() => navigate('/checklist/checklisTIdhere/punchIdHere')}
                        >
                            <Typography margin={'0.5rem'}>{punch.id.toUpperCase()}</Typography>
                        </CardActionArea>
                        <IconButton sx={{ position: 'absolute', right: 0 }} onClick={handleDelete}>
                            <DeleteIcon color="secondary"></DeleteIcon>
                        </IconButton>
                    </PunchCard>
                ))}
            </Stack>
            <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={() => navigate('/checklist/idhere/idhere')}
            >
                ADD
            </Button>
        </Box>
    );
};

export default PunchesMain;
