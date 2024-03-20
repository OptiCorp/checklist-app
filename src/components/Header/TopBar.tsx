import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DrawerContent from './DrawerContent';
import { useNavigate } from 'react-router-dom';

const navigations = ['home', 'nother', 'another'];

function TopBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleToggleNav = () => {
        //setAnchorElNav(event.currentTarget);
        setDrawerOpen((prevState) => !prevState);
    };

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    //   };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //   const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    //   };

    return (
        <>
            <AppBar position="static" color="transparent">
                <Container maxWidth={'lg'}>
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Box
                            onClick={() => navigate('/')}
                            component="img"
                            sx={{ width: 40, mr: 2, cursor: 'pointer' }}
                            alt="logo"
                            src={'/WP_1.svg'}
                        />
                        {/* <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        ></Typography> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {navigations.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 1 }}></Box>

                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleToggleNav}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <nav>
                <Drawer
                    color="primary"
                    variant="temporary"
                    onClose={handleToggleNav}
                    anchor="right"
                    open={drawerOpen}
                    ModalProps={{ keepMounted: true }}
                >
                    <DrawerContent handleDrawerToggle={handleToggleNav}></DrawerContent>
                </Drawer>
            </nav>
        </>
    );
}
export default TopBar;
