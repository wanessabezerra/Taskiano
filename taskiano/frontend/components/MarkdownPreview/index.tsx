import React from "react";
import MarkdownWrapper from "../MarkdownWrapper";

import styles from "./styles.module.scss";

interface MarkdownPreviewProps {
  className?: string;
  note: string;
}

export const MarkdownPreview = (props: MarkdownPreviewProps) => {
  return (
    <div className={styles.notePreviewContainer}>
      <label>Preview</label>
      <MarkdownWrapper
        className={`${styles.markdown} ${props.className}`}
        note={props.note}
      />
    </div>
  );
};
