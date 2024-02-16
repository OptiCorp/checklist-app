import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardWrapper from '../UI/CardWrapper';
import CardWrapperList, { listTextType } from '../UI/CardWrapperList';

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const dummyTextSections: listTextType[] = [
    { id: 'wp id', text: '5321-1' },
    { id: 's/n', text: '1143 D12C 12' },
    { id: 'p/n', text: 'bv 113 eu' },
];

const MobilizationTab = () => {
    const navigate = useNavigate();
    //const { state } = useLocation();

    const firstText = (
        <StyledUl>
            {dummyTextSections.map((item, i) => (
                <CardWrapperList key={i} id={item.id} text={item.text} />
            ))}
        </StyledUl>
    );
    const middleText = (
        <StyledUl>
            {dummyTextSections.map((item, i) => (
                <CardWrapperList key={i} id={item.id} text={item.text} />
            ))}
        </StyledUl>
    );
    const secondText = (
        <StyledUl>
            {dummyTextSections.map((item, i) => (
                <CardWrapperList key={i} id={item.id} text={item.text} />
            ))}
        </StyledUl>
    );

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Stack spacing={{ xs: 1.5, sm: 2, md: 4, lg: 4 }}>
                    <CardWrapper
                        firstChild={firstText}
                        secondChild={secondText}
                        middleChild={middleText}
                    ></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                    <CardWrapper firstChild={firstText} secondChild={secondText}></CardWrapper>
                </Stack>
            </Box>
            <Button variant="contained" onClick={() => navigate('newMob')} sx={{ float: 'right' }}>
                Create new mob
            </Button>
        </>
    );
};

export default MobilizationTab;
