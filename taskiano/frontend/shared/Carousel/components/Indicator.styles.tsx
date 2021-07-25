import styled from "styled-components";

export const Indicator = styled.button`
    cursor: pointer;

    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;

    transition: all 0.2s ease-in-out;
`;

export const IndicatorSelected = styled(Indicator)`
    background-color: #7a858a;

    &:hover {
        background-color: #006492;
    }
`;

export const IndicatorUnselected = styled(Indicator)`
    background-color: #c4c4c4;

    &:hover {
        background-color: #718892;
    }
`;
