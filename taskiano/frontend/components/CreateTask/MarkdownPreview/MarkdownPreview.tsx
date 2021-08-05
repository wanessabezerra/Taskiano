import React from "react";
import MarkdownWrapper from "../MarkdownWrapper";

import styles from "./styles.module.scss";

interface MarkdownPreviewProps {
  note: string;
}

export const MarkdownPreview = (props: MarkdownPreviewProps) => {
  return (
    <div className={styles.notePreviewContainer}>
      <label>Preview</label>
      <MarkdownWrapper className={styles.markdown} note={props.note} />
    </div>
  );
};
