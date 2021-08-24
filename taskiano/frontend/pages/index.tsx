import React from "react";
import Head from "next/head";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
import Particles from "react-tsparticles";

import { useAuth } from "../hooks/useAuth";

import logo from "../assets/icons/logo_primary.svg";
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
  const { user, signIn } = useAuth();

  async function handleSingIn(provider: string) {
    if (!user) await signIn(provider);
  }

  return (
    <div className={styles.pageAuth}>
      <Head>
        <title>Taskiano | Login</title>
        <meta name="description" content="To-do" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <aside className={styles.sidebar}>
        <Particles
          className={styles.particles}
          options={{
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  parallax: {
                    enable: true,
                  },
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 4,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src={logo} alt="logo" />
          </div>
          <h1 className={styles.logoText}>TASKIANO</h1>
        </div>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <span>Entrar com...</span>
          <ButtonProvider
            name="Google"
            provider="google"
            handleSingIn={handleSingIn}
          >
            <FcGoogle />
          </ButtonProvider>

          <ButtonProvider
            name="Twitter"
            provider="twitter"
            handleSingIn={handleSingIn}
          >
            <AiFillTwitterCircle color="#57A9E3" />
          </ButtonProvider>

          <ButtonProvider
            name="Facebook"
            provider="facebook"
            handleSingIn={handleSingIn}
          >
            <FaFacebook color="#3D5694" />
          </ButtonProvider>

          <ButtonProvider
            name="GitHub"
            provider="github"
            handleSingIn={handleSingIn}
          >
            <AiFillGithub />
          </ButtonProvider>
        </div>
      </main>
    </div>
  );
}

export default Login;
