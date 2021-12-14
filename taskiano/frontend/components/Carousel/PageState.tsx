import { useState, useEffect } from "react";

interface PageStateProps {
  infiniteScroll?: boolean;
  pageCount: number;
  count: number;
}

function PageState(props: PageStateProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isInRange, setIsInRange] = useState<boolean>(true);

  useEffect(() => {
    setIsInRange(currentPage < props.pageCount);
  }, [currentPage, props.pageCount]);

  const handles = {
    decrease: () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
      else props.infiniteScroll && setCurrentPage(props.pageCount);
    },
    increase: () => {
      if (isInRange) setCurrentPage(currentPage + 1);
      else props.infiniteScroll && setCurrentPage(1);
    },
  };

  return { currentPage, setCurrentPage, handles };
}

export default PageState;
