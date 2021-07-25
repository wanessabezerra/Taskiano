import React from "react";
import Image from "next/image";

import logoPrimaryImg from "../../assets/icons/logo_primary.svg";
import styles from "./styles.module.scss";

interface SidebarProps {}

function Sidebar(props: SidebarProps) {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.logoIcon}>
                <Image src={logoPrimaryImg} alt="logo"></Image>
            </div>
        </div>
    );
}

export default Sidebar;
