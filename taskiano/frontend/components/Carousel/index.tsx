import React, { ReactNode, useState, Children, useEffect } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import PageIndicators from "./PageIndicator";
import { CarouselContainer } from "./components/CarouselContainer.styles";

import styles from "./styles.module.scss";

type CarouselProps = {
    className?: string;
    gap?: number;
    infiniteScroll?: boolean;
    autoInfiniteScroll?: boolean;
    autoInfiniteScrollInterval?: number | 3000;
    showIndicator?: boolean;
    howMany: number;
    children: ReactNode | Element[];
};

function Carousel(props: CarouselProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handles = {
        decrease() {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
        },
        increase() {
            if (currentPage < Children.count(props.children) / props.howMany) {
                setCurrentPage(currentPage + 1);
            } else {
                props.infiniteScroll && setCurrentPage(1);
            }
        },
    };

    useEffect(() => {
        if (props.autoInfiniteScroll)
            return () =>
                clearTimeout(
                    setTimeout(
                        () => handles.increase(),
                        props.autoInfiniteScrollInterval
                    )
                );
    }, [currentPage]);

    return (
        <div className={`${styles.carouselContainer}  ${props?.className}`}>
            <div className={styles.widgetsSlider}>
                <div className={styles.circleIcon}>
                    <IoIosArrowBack onClick={handles.decrease} />
                </div>

                <CarouselContainer gap={props.gap}>
                    {React.Children.map(props.children, (child, index) => {
                        if (
                            index + 1 <= currentPage * props.howMany &&
                            index + 1 > (currentPage - 1) * props.howMany
                        ) {
                            return child;
                        }
                    })}
                </CarouselContainer>

                <div className={styles.circleIcon}>
                    <IoIosArrowForward onClick={handles.increase} />
                </div>

            </div>

            {props.showIndicator && (
                <PageIndicators
                    perPage={props.howMany}
                    currentPage={currentPage}
                    onClick={setCurrentPage}
                >
                    {props.children}
                </PageIndicators>
            )}
        </div>
    );
}

export default Carousel;
