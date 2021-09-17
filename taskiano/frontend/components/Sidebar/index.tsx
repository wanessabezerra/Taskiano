import React from "react";

import Logo from "../Logo";
import styles from "./styles.module.scss";

interface SidebarProps {}

function Sidebar(props: SidebarProps) {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.logoIcon}>
              <Logo />
            </div>
        </div>
    );
}

export default Sidebar;
