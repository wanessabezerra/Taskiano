import React, { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

import styles from "./styles.module.scss";

interface TopbarProps {}

function Topbar(props: TopbarProps) {
  const [search, setSearch] = useState("");
  const [useImg, setUseImg] = useState(true);
  const { user } = useAuth();

  return (
    <div className={styles.topbarContainer}>
      <input
        type="text"
        value={search}
        placeholder="pesquisar"
        className={styles.searchBar}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.userAvatar}>
        {user?.avatar && useImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user?.avatar}
            alt="user_avatar"
            onError={() => setUseImg(false)}
          />
        ) : (
          <FaUserCircle />
        )}
      </div>
    </div>
  );
}

export default Topbar;
