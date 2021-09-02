import { toast } from "react-toastify";

export const ToastTryOtherProvider = () =>
  toast.error("Ops, Tente outro provedor 🤨");

export const ToastTryAgain = () =>
  toast.error("Ops, Tente entrar novamente 😢");

export const ToastDisconnected = () =>
  toast.error("Ops, Você está desconectado 😗");

export const ToastABug = () => toast.error("Um inseto 😱");

export const ToastComeBackSoon = () => toast.success("Volte logo 👋");

export const ToastEmailExists = (providerId?: string) =>
  toast.warn(`Esse email já é utilizado por ${providerId}`);
