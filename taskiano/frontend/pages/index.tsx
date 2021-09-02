import React, { memo, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";

import firebase from "firebase/app";

import Particles from "react-tsparticles";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";

import { useAuth } from "../hooks/useAuth";

import logo from "../assets/icons/logo_primary.svg";

import colors from "../styles/colors";
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

const Logo = memo(function LogoFC() {
  return (
    <div className={styles.logo}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo" />
      </div>
      <h1 className={styles.logoText}>TASKIANO</h1>
    </div>
  );
});

function Login() {
  const signIn = useAuth((ctx) => ctx.signIn);

  const handleSingIn = useCallback(
    (provider: string) => signIn(provider),
    [signIn]
  );

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
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
              },
            },
            particles: {
              color: {
                value: [
                  colors.purple,
                  colors.orange,
                  colors.highPurple,
                  colors.highOrange,
                  colors.white,
                ],
              },
              move: {
                attract: {
                  enable: false,
                  rotate: { x: 800, y: 800 },
                },
                direction: "none",
                enable: true,
                outModes: { default: "destroy" },
                random: false,
                speed: 3,
                straight: false,
                trail: { enable: true, length: 30 },
              },
              number: { density: { enable: true, area: 400 }, value: 0 },
              opacity: { value: 0.4 },
              shape: { type: "circle" },
              size: {
                value: 25,
                animation: {
                  startValue: "min",
                  enable: true,
                  minimumValue: 1,
                  speed: 2,
                  destroy: "max",
                  sync: true,
                },
              },
            },
            detectRetina: true,
            emitters: {
              direction: "none",
              rate: { quantity: 5, delay: 0.3 },
              size: { width: 0, height: 0 },
              position: { x: 50, y: 50 },
            },
          }}
        />
        <Logo />
      </aside>

      <main>
        <div className={styles.mainContent}>
          <span>Entrar com...</span>
          <ButtonProvider
            name="Google"
            provider={firebase.auth.GoogleAuthProvider.PROVIDER_ID}
            handleSingIn={handleSingIn}
          >
            <FcGoogle />
          </ButtonProvider>

          <ButtonProvider
            name="Twitter"
            provider={firebase.auth.TwitterAuthProvider.PROVIDER_ID}
            handleSingIn={handleSingIn}
          >
            <AiFillTwitterCircle color="#57A9E3" />
          </ButtonProvider>

          <ButtonProvider
            name="Facebook"
            provider={firebase.auth.FacebookAuthProvider.PROVIDER_ID}
            handleSingIn={handleSingIn}
          >
            <FaFacebook color="#3D5694" />
          </ButtonProvider>

          <ButtonProvider
            name="GitHub"
            provider={firebase.auth.GithubAuthProvider.PROVIDER_ID}
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
