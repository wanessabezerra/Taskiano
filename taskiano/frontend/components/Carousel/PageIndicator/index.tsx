import React from "react";

import styles from "./styles.module.scss";

interface PageIndicatorProps {
  count: number;
  currentPage: number;
  onClick: (index: number) => void;
}

function PageIndicators(props: PageIndicatorProps) {
  function isCurrentPage(index: number) {
    return index + 1 === props.currentPage;
  }

  return (
    <div className={styles.pageIndicatorsContainer}>
      {Array.from({ length: props.count }, (_, index) => (
        <div
          key={index}
          className={
            isCurrentPage(index)
              ? styles.indicatorSelected
              : styles.indicatorUnselected
          }
          onClick={() => props.onClick(index + 1)}
        />
      ))}
    </div>
  );
}

export default PageIndicators;
