import React, { useState } from "react";
import { Bar } from "./components/Bar.styles";

import styles from "./styles.module.scss";

interface WeekdayBarProps {
    day: string;
    value: number;
    height: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function WeekdayBar(props: WeekdayBarProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={styles.weekdayBarContainer}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Bar height={props.height} onClick={props.onClick} />
            <div className={styles.weekday}>{props.day}</div>
            {hovered && (
                <div className={styles.tasksDone}>
                    <h1>{props.value}</h1>
                    <p>{`Task's`}</p>
                </div>
            )}
        </div>
    );
}

export default WeekdayBar;
