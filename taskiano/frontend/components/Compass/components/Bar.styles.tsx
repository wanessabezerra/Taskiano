import styled from "styled-components";

import colors from "../../../styles/colors";

interface BarProps {
  height: number;
}

export const Bar = styled.button<BarProps>`
  background: linear-gradient(
    180deg,
    ${colors.purple} 17%,
    ${colors.orange} 85%
  );
  border-radius: 8px;

  height: ${(props) => props.height}%;
  width: 1.3rem;

  transition: transform 0.2s ease-out;

  &:hover {
    background: linear-gradient(
      180deg,
      ${colors.highPurple} 17%,
      ${colors.highOrange} 85%
    );
  }
`;
