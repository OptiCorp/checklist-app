import { Box } from '@mui/material';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const BottomButtons: FC<Props> = ({ children }) => {
    const [domReady, setDomReady] = React.useState(false);

    React.useEffect(() => {
        setDomReady(true);
    }, []);

    return domReady
        ? ReactDOM.createPortal(
              <Box
                  sx={{
                      mt: '1rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '1rem',
                  }}
              >
                  {children}
              </Box>,
              document.getElementById('bottom-buttons')!
          )
        : null;
};

export default BottomButtons;
