import styles from "../styles/App.module.css";

export default function RepoDetails({ name, description, stars, link }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>
        <strong>{name}</strong>
      </p>
      <p className={styles.label}>
        Description: <strong>{description}</strong>
      </p>
      <p className={styles.label}>Stars {stars}</p>
      <a href={link}>Open repo</a>
    </div>
  );
}
