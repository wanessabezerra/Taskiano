import styled from "styled-components";

interface BarProps {
    height: number;
}

export const Bar = styled.button<BarProps>`
    background: linear-gradient(180deg, #bd8eff 17%, #fdb263 85%);
    border-radius: 8px;

    height: ${(props) => props.height}%;
    width: 1.3rem;

    transition: transform .2s ease-out;

    &:hover {
        background: linear-gradient(180deg, #a46df1 17%, #e09442 85%);
    }

`;
