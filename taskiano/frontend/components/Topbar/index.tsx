import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

import { FaUserCircle } from "react-icons/fa";

import styles from "./styles.module.scss";

interface TopbarProps {
  userAvatar?: ImageProps;
}

function Topbar(props: TopbarProps) {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.topbarContainer}>
      <input
        className={styles.searchBar}
        type="text"
        value={search}
        placeholder="pesquisar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.userAvatar}>
        {props.userAvatar ? (
          <Image {...props.userAvatar} alt="user_avatar"></Image>
        ) : (
          <FaUserCircle />
        )}
      </div>
    </div>
  );
}

export default Topbar;
