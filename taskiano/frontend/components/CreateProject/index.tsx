import React, { useState } from "react";

import { MdColorLens } from "react-icons/md";

import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

import Modal from "../Modal";

import colors from "../../styles/colors";
import styles from "./styles.module.scss";

interface CreateProjectProps {
  close: () => void;
}

function CreateProjectFC(props: CreateProjectProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colors.purple);

  const create = useProjects((ctx) => ctx.create);
  const user = useAuth((ctx) => ctx.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await create({
      name,
      description,
      color: parseInt(color.substr(1, 6), 16),
      created_at: new Date(),
      user: user?.id,
    });

    props.close();
  };

  return (
    <Modal close={props.close}>
      <div className={styles.container}>
        <h1 className={styles.title}>Novo Projeto</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`${styles.inputContainer} ${styles.description}`}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="color">Cor</label>
            <div className={styles.inputColor}>
              <MdColorLens />
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <button className={styles.submitButton} type="submit">
              Criar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const CreateProject = React.memo(CreateProjectFC);
export default CreateProject;
