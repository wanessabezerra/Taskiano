import React, { Children, ReactNode, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./styles.module.scss";

interface SelectorProps {
  onChange: (value: number) => void;
  current?: number;
  children: ReactNode[];
}

function Selector(props: SelectorProps) {
  const [selected, setSelected] = useState(props.current ?? 0);
  const childrenCount = Children.count(props.children);

  const handles = {
    decrease: () => {
      if (selected === 0) setSelected(childrenCount - 1);
      else setSelected(selected - 1);
    },
    increase: () => {
      if (selected === childrenCount - 1) setSelected(0);
      else setSelected(selected + 1);
    },
  };

  useEffect(() => {
    props.onChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className={styles.selector}>
      {childrenCount > 1 && (
        <div className={styles.circleIcon} onClick={handles.decrease}>
          <IoIosArrowBack />
        </div>
      )}

      <div className={styles.children}>{props.children[selected]}</div>

      {childrenCount > 1 && (
        <div className={styles.circleIcon} onClick={handles.increase}>
          <IoIosArrowForward />
        </div>
      )}
    </div>
  );
}

export default Selector;
