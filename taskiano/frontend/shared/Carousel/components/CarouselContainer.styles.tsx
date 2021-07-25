import styled from "styled-components";

interface CarouselContainerProps {
    gap?: number;
}

export const CarouselContainer = styled.div<CarouselContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    gap: ${(props) => `${props.gap}rem` || 0};

`;
