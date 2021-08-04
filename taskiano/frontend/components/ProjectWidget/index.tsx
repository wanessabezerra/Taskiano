import React from "react";

import styles from "./styles.module.scss";

interface ProjectWidgetProps {
  name: string;
}

function ProjectWidget(props: ProjectWidgetProps) {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
}

export default ProjectWidget;
