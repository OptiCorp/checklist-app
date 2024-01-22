import { useMsal } from '@azure/msal-react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export const Login = () => {
  const { instance } = useMsal();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = () => {
    setIsSubmitting(true);
    instance.loginPopup().catch((error) => {
      console.error('Failed to login: ', error);
    });
  };
  return (
    <>
      <Box component="img" sx={{ width: 40, mr: 1 }} alt="logo" src={'/WP_1.svg'} />
      <Typography variant="h3">Log in to your account</Typography>

      <Button type="submit" onClick={onSubmit} variant="contained">
        {isSubmitting ? <>Logging in</> : <>Login in</>}
      </Button>
    </>
    // <ButtonWrapper>
    //   <LoginButton
    //     type="submit"
    //     aria-disabled={isSubmitting ? true : false}
    //     aria-label={isSubmitting ? 'loading data' : ''}
    //     onClick={onSubmit}>
    //     {isSubmitting ? <>Logging in..</> : 'Log in'}
    //   </LoginButton>
    // </ButtonWrapper>
  );
};
