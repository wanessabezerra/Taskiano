import React, { FormEvent, useState } from "react";

import { useHello } from "../../hooks/useHello";

import styles from "../../styles/components/User.module.scss";

export function User() {
    const user = useHello();
    const [username, setUsername] = useState("");

    async function handleSearchUser(event: FormEvent) {
        event.preventDefault();

        if (username.trim() === "") return;

        user.searchGithubUser(username);
    }

    return (
        <div className={styles.searchUser}>
            <div className={styles.user}>
                <h1>Example of Context and Axios</h1>
                <img src={user.githubUser?.avatar} alt={''}></img>
                <h1 className={styles.name}>Name: {user.githubUser?.name}</h1>
                <p className={styles.userId}>Id: {user.githubUser?.id}</p>
            </div>
            <form onSubmit={handleSearchUser}>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder={"Enter your Github username"}
                    ></input>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}
