import React, { Dispatch, ReactNode, SetStateAction } from "react";

import styles from "./styles.module.scss";

interface PageIndicatorProps {
  perPage: number;
  currentPage: number;
  onClick: Dispatch<SetStateAction<number>>;
  children: ReactNode | Element[];
}

function PageIndicators(props: PageIndicatorProps) {
  const total = React.Children.count(props.children);
  const handleOnClick = (index: number) => props.onClick(index + 1);

  return (
    <div className={styles.pageIndicatorsContainer}>
      {React.Children.map(props.children, (_, index) => {
        if (index + 1 === props.currentPage)
          return (
            <div
              className={styles.indicatorSelected}
              onClick={() => handleOnClick(index)}
            />
          );
        else if (index + 1 * props.perPage < total - 1)
          return (
            <div
              className={styles.indicatorUnselected}
              onClick={() => handleOnClick(index)}
            />
          );
      })}
    </div>
  );
}

export default PageIndicators;
