import { Box, Divider, Paper, Typography, styled } from '@mui/material';

const PaperFooter = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    lineHeight: '60px',
}));

const Footer = () => {
    return (
        <Box marginTop={'1rem'}>
            <Divider sx={{ bgcolor: 'black', opacity: 0.6 }}></Divider>
            <PaperFooter
                sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '2rem',
                    gap: 2,
                }}
                elevation={3}
            >
                <Typography variant="caption">©</Typography>
                <Typography variant="caption">2024</Typography>
                <Typography variant="caption">WellPartner</Typography>
            </PaperFooter>
        </Box>
    );
};

export default Footer;
