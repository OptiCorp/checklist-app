import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledInfoDiv = styled.div`
    background-color: ${COLORS.white};
    border-radius: 8px;

    padding: 2rem;
    box-shadow: 2.5px 2.5px ${COLORS.gray};
`;

export const StyledLists = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledCompactLists = styled.div`
    border-radius: 5px;
    display: flex;
    justify-content: start;
    flex-direction: column;
    margin-inline: auto;
    width: 100%;
`;

export const StyledTitle = styled.h1`
    font-weight: 600;
    color: ${COLORS.gray};
    letter-spacing: 0.3rem;
    display: inline;
    font-size: 1.2rem;
`;
