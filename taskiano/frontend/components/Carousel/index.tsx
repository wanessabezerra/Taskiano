import React, { ReactNode, Children, useEffect } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import PageIndicators from "./PageIndicator";
import PageState from "./PageState";

import styles from "./styles.module.scss";

type CarouselProps = {
  className?: string;
  gap?: number;
  infiniteScroll?: boolean;
  autoInfiniteScroll?: boolean;
  autoInfiniteScrollInterval?: number;
  showIndicator?: boolean;
  howMany: number;
  children: ReactNode | Element[];
};

function Carousel({
  autoInfiniteScrollInterval = 3000,
  gap = 2,
  ...props
}: CarouselProps) {
  const childrenCount = Children.count(props.children);
  const pageCount = Math.ceil(childrenCount / props.howMany);
  const itemsContainerStyle = { gap: `${gap}rem` };

  const { currentPage, setCurrentPage, handles } = PageState({
    pageCount,
    count: childrenCount,
    infiniteScroll: props.infiniteScroll,
  });

  function showInPage(index: number) {
    return (
      index + 1 <= currentPage * props.howMany &&
      index + 1 > (currentPage - 1) * props.howMany
    );
  }

  useEffect(() => {
    props.autoInfiniteScroll &&
      setTimeout(() => handles.increase(), autoInfiniteScrollInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoInfiniteScrollInterval, currentPage, props.autoInfiniteScroll]);

  return (
    <div className={`${styles.carouselContainer}  ${props?.className}`}>
      <div className={styles.widgetsSlider}>
        <div className={styles.circleIcon}>
          <IoIosArrowBack onClick={handles.decrease} />
        </div>

        <div className={styles.itemsContainer} style={itemsContainerStyle}>
          {React.Children.map(
            props.children,
            (child, index) => showInPage(index) && child
          )}
        </div>

        <div className={styles.circleIcon}>
          <IoIosArrowForward onClick={handles.increase} />
        </div>
      </div>

      {props.showIndicator && (
        <PageIndicators
          count={pageCount}
          currentPage={currentPage}
          onClick={(index: number) => setCurrentPage(index)}
        />
      )}
    </div>
  );
}

export default Carousel;
