import React, { memo } from "react";
import MarkdownWrapper from "../MarkdownWrapper";

import styles from "./styles.module.scss";

interface MarkdownPreviewProps {
  className?: string;
  showLabel?: boolean;
  note?: string;
}

const MarkdownPreviewFC = (props: MarkdownPreviewProps) => {
  return (
    <div className={styles.notePreviewContainer}>
      {props.showLabel && <label>Preview</label>}
      <MarkdownWrapper
        className={`${styles.markdown} ${props.className}`}
        note={props.note}
      />
    </div>
  );
};

const MarkdownPreview = memo(MarkdownPreviewFC);
export default MarkdownPreview;
