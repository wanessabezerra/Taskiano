import React from "react";

import Modal from "../../Modal";

import EditorTask from "../Editor";

interface CreateTaskProps {
  projectColor?: string;
  projectId?: string;
  close: () => void;
}

function CreateTask(props: CreateTaskProps) {
  return (
    <Modal close={props.close}>
      <EditorTask {...props} />
    </Modal>
  );
}

export default CreateTask;
