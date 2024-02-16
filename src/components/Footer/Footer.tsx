import { Box, Divider, Paper, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box marginTop={'1rem'}>
            <Divider sx={{ bgcolor: 'black', opacity: 0.6 }}></Divider>
            <Paper
                sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '2rem',
                    bgcolor: '#e6e6e6',
                }}
                elevation={3}
            >
                <Typography variant="body1">WP</Typography>
            </Paper>
        </Box>
    );
};

export default Footer;
