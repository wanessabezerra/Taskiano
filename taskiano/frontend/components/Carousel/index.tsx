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
  hideArrowInFirstAndLastPage?: boolean;
  howMany: number;
  children: ReactNode | Element[];
};

function Carousel(props: CarouselProps) {
  const childrenCount = Children.count(props.children);
  const pageCount = Math.ceil(childrenCount / props.howMany);
  const itemsContainerStyle = { gap: `${props.gap ?? 2}rem` };

  const { currentPage, setCurrentPage, handles } = PageState({
    pageCount,
    count: childrenCount,
    infiniteScroll: props.infiniteScroll,
  });

  const ShowArrowBackward = () => {
    return !(currentPage === 1 && props.hideArrowInFirstAndLastPage);
  };

  const ShowArrowForward = () => {
    return !(
      currentPage === pageCount - 1 && props.hideArrowInFirstAndLastPage
    );
  };

  const showInPage = (index: number) => {
    return (
      index + 1 <= currentPage * props.howMany &&
      index + 1 > (currentPage - 1) * props.howMany
    );
  };

  useEffect(() => {
    props.autoInfiniteScroll &&
      setTimeout(
        () => handles.increase(),
        props.autoInfiniteScrollInterval ?? 3000
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoInfiniteScrollInterval, currentPage, props.autoInfiniteScroll]);

  return (
    <div className={`${styles.carouselContainer}  ${props?.className}`}>
      <div className={styles.widgetsSlider}>
        {ShowArrowBackward() && (
          <div className={styles.circleIcon} onClick={handles.decrease}>
            <IoIosArrowBack />
          </div>
        )}

        <div className={styles.itemsContainer} style={itemsContainerStyle}>
          {React.Children.map(
            props.children,
            (child, index) => showInPage(index) && child
          )}
        </div>

        {ShowArrowForward() && (
          <div className={styles.circleIcon} onClick={handles.increase}>
            <IoIosArrowForward />
          </div>
        )}
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
