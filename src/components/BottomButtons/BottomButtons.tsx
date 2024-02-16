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
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 'auto',
                      pt: '1rem',
                  }}
              >
                  {children}
              </Box>,
              document.getElementById('bottom-buttons')
          )
        : null;
    //const matches = useMediaQuery('(min-width:600px)');
};

export default BottomButtons;
