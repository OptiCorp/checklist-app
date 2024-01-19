import { Button, Container, CssBaseline } from '@mui/material';
import React from 'react';
import TopBar from '../components/Header/TopBar';

const RootLayout = () => {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <main>
        <Container maxWidth={'lg'}>Beginning</Container>
      </main>
    </>
  );
};

export default RootLayout;
