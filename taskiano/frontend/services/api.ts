import { TaskType, Weekday } from "../@types";

export const nextTasks: TaskType[] = [
    {
        id: 1,
        title: "Organizar repositório da disciplina de ES II",
        remainingTime: 1800,
    },
    {
        id: 2,
        title: "Enviar tarefa BD2 Sigaa",
        remainingTime: 120,
    },
    {
        id: 3,
        title: "Prova de Engenharia de Software 2",
        remainingTime: 432000,
    },
];

export const lateTasks: TaskType[] = [
    {
        id: 1,
        title: "Atividade de exercício BD2",
        remainingTime: -345600,
    },
    {
        id: 2,
        title: "Tópico do fórum de BD2",
        remainingTime: -705600,
    },
    {
        id: 3,
        title: "Responder e-mails do IMD",
        remainingTime: -432000,
    },
];

export const tasks = [
    { number: 42 },
    { number: 48 },
    { number: 51 },
    { number: 57 },
    { number: 84 },
    { number: 93 },
    { number: 102 },
];

export const weekdays: Weekday[] = [
    { day: "dom", count: 20 },
    { day: "seg", count: 33 },
    { day: "ter", count: 42 },
    { day: "qua", count: 37 },
    { day: "qui", count: 56 },
    { day: "sex", count: 34 },
    { day: "sab", count: 23 },
];
