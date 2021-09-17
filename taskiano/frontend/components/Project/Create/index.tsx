import React from "react";

import EditorProject from "../Editor";

interface CreateProjectProps {
  close: () => void;
}

function CreateProject(props: CreateProjectProps) {
  return <EditorProject {...props} />;
}

export default CreateProject;
