import styles from "../styles/App.module.css";

export default function BasicCard({
  userName,
  image,
  followers,
  following,
  numberOfRepos,
  memberSince,
  html_url,
}) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>@{userName}</p>
      <img className={styles.image} alt="Avatar" src={image} />
      <p className={styles.label}>
        Followers {followers}
        {" | "}
        Following {following}
      </p>
      <br />
      <p className={styles.label}>Total public repos: {numberOfRepos}</p>
      <br />
      <p className={styles.label}>
        Member since: {memberSince.split("T")[0].split("-").reverse().join("/")}
      </p>
      <br />
      <a className={styles.link} href={html_url}>
        Open
      </a>
    </div>
  );
}
