import { useState } from "react";
import { fetchUser } from "../services";
import styles from "../styles/App.module.css";
import Card from "./Card";

export default function UserComponent() {
  // this state will have the github user handle
  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setError] = useState(null);
  const [userData, setData] = useState(null);

  // handle search button
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!handle) return;
      // here we'll be making a network request, so we'll display progress here
      setIsLoading(true);
      // get the value from the state and make a get request to the Github API
      const data = await fetchUser(handle);
      setIsLoading(false);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.app}>
        <input
          className={styles.search}
          id="filled-basic"
          placeholder="Github Handle"
          type={"text"}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        {!isLoading ? (
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {userData && (
        <Card
          userName={userData.user.userName}
          image={userData.user.image}
          followers={userData.user.followers}
          following={userData.user.following}
          numberOfRepos={userData.user.numberOfRepos}
          memberSince={userData.user.memberSince}
          html_url={userData.user.html_url}
        />
      )}
    </>
  );
}
