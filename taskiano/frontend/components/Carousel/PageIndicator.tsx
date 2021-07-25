import React, { Dispatch, ReactNode, SetStateAction } from "react";

import {
    IndicatorSelected,
    IndicatorUnselected,
} from "./components/Indicator.styles";

import styled from "styled-components";

const PageIndicatorsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    gap: 0.7rem;
`;

interface PageIndicatorProps {
    perPage: number;
    currentPage: number;
    onClick: Dispatch<SetStateAction<number>>;
    children: ReactNode | Element[];
}

function PageIndicators(props: PageIndicatorProps) {
    const total = React.Children.count(props.children);

    return (
        <PageIndicatorsContainer>
            {React.Children.map(props.children, (_, index) => {
                if (index + 1 === props.currentPage)
                    return (
                        <IndicatorSelected
                            onClick={() => props.onClick(index + 1)}
                        />
                    );
                else if (index + 1 * props.perPage < total - 1)
                    return (
                        <IndicatorUnselected
                            onClick={() => props.onClick(index + 1)}
                        />
                    );
            })}
        </PageIndicatorsContainer>
    );
}

export default PageIndicators;
