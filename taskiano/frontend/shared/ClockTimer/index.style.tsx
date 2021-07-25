import React from "react";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { BsCalendarFill } from "react-icons/bs";

import * as utils from "../../utils";

interface ClockTimerProps {
    remainingTime: number;
}

export function ClockTimer({ remainingTime }: ClockTimerProps) {
    if (remainingTime > 0) {
        const color = utils.selectColorByTime({ remainingTime });

        return (
            <ClockTimerContainer color={color}>
                <GiAlarmClock id="iconClockClip" />
            </ClockTimerContainer>
        );
    } else {
        return (
            <CalendarTimeContainer>
                <BsCalendarFill />
            </CalendarTimeContainer>
        );
    }
}

interface ClockTimerContainerProps {
    color: string;
}

const ClockTimerContainer = styled.div<ClockTimerContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;

    background: ${(props) => props.color};

    clip-path: url(#iconClockClip);
`;

const CalendarTimeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.5rem;
    height: 1.5rem;

    color: #9e9e9e;
`;
