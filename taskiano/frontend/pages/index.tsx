import React from "react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";

import { useAuth } from "../hooks/useAuth";

import styles from "../styles/Login.module.scss";

function Login() {
  const router = useRouter();
  const {
    user,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithGithub,
  } = useAuth();

  async function handleSingin(provider: string) {
    if (!user) {
      if (provider === "google") await signInWithGoogle();
      else if (provider === "facebook") await signInWithFacebook();
      else if (provider === "twitter") await signInWithTwitter();
      else if (provider === "github") await signInWithGithub();
    }

    router.push("/home");
  }

  return (
    <div className={styles.pageAuth}>
      <aside></aside>
      <main>
        <div className={styles.mainContent}>
          <span>Entrar com</span>
          <button
            className={styles.signInButton}
            onClick={() => handleSingin("google")}
          >
            <FcGoogle />
            Google
          </button>
          <button
            className={styles.signInButton}
            onClick={() => handleSingin("twitter")}
          >
            <AiFillTwitterCircle color="#57A9E3" />
            Twitter
          </button>
          <button
            className={styles.signInButton}
            onClick={() => handleSingin("facebook")}
          >
            <FaFacebook color="#3D5694" />
            Facebook
          </button>
          <button
            className={styles.signInButton}
            onClick={() => handleSingin("github")}
          >
            <AiFillGithub />
            GitHub
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
