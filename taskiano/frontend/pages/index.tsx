import React from "react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";

import { useAuth } from "../hooks/useAuth";

import styles from "../styles/Login.module.scss";

interface ButtonProviderProps {
  name: string;
  provider: string;
  handleSingIn: (provider: string) => void;
  children: React.ReactNode;
}

const ButtonProvider = (props: ButtonProviderProps) => {
  return (
    <button
      className={styles.signInButton}
      onClick={() => props.handleSingIn(props.provider)}
    >
      {props.children}
      {props.name}
    </button>
  );
};

function Login() {
  const router = useRouter();
  const { user, signIn } = useAuth();

  async function handleSingIn(provider: string) {
    if (!user) await signIn(provider);
    router.push("/home");
  }

  return (
    <div className={styles.pageAuth}>
      <aside></aside>
      <main>
        <div className={styles.mainContent}>
          <span>Entrar com</span>
          <ButtonProvider name="Google" provider="google" handleSingIn={handleSingIn}>
            <FcGoogle />
          </ButtonProvider>

          <ButtonProvider name="Twitter" provider="twitter" handleSingIn={handleSingIn}>
            <AiFillTwitterCircle color="#57A9E3" />
          </ButtonProvider>

          <ButtonProvider name="Facebook" provider="facebook" handleSingIn={handleSingIn}>
            <FaFacebook color="#3D5694" />
          </ButtonProvider>

          <ButtonProvider name="GitHub" provider="github" handleSingIn={handleSingIn}>
            <AiFillGithub />
          </ButtonProvider>
        </div>
      </main>
    </div>
  );
}

export default Login;
