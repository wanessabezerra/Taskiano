import styles from "../../styles/components/Card.module.scss";

interface CardProps {
    title: string;
    description: string;
    href: string;
}

export function Card(props: CardProps) {
    return (
        <a href={props.href} className={styles.card}>
            <h2>{props.title}</h2>
            <p>props.desc</p>
        </a>
    );
}
