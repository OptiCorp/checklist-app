import { FunctionComponent } from 'react';
import { StyledCompactLists, StyledInfoDiv, StyledLists, StyledTitle } from './styles';

interface CardProps {
    children: React.ReactNode;
    title: string;
    onClick?: () => void;
}

export const CustomCard: FunctionComponent<CardProps> = ({ children, title, onClick }) => {
    // const { width } = useWindowDimensions();
    const width = 801;
    return (
        <>
            <StyledInfoDiv onClick={onClick}>
                {width > 800 ? (
                    <StyledLists>
                        <StyledTitle>{title}</StyledTitle>
                        {children}
                    </StyledLists>
                ) : (
                    <StyledCompactLists>
                        <StyledTitle>{title}</StyledTitle>
                        {children}
                    </StyledCompactLists>
                )}
            </StyledInfoDiv>
        </>
    );
};
