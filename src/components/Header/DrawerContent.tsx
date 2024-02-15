import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DrawerProps {
    handleDrawerToggle: () => void;
}

// const navItems = ['Home', 'About', 'Contact'];

const DrawerContent = ({ handleDrawerToggle }: DrawerProps) => {
    const navigate = useNavigate();
    const handleItemClick = (link: string) => {
        navigate(link);
        handleDrawerToggle();
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Navigation
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleItemClick('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} onClick={() => navigate('/')} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
            </List>
        </Box>
    );
};

export default DrawerContent;
