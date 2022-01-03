import { useEffect, useState } from "react";
import RepoDetails from "../components/RepoDetails";
import { fetchUserRepo } from "../services";
import styles from "../styles/App.module.css";

export default function RepoComponent() {
  // this state will have the github user handle
  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repoData, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {}, [pageNumber, repoData]);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  // handle search button
  const handleSearch = async (e, i = 0) => {
    e.preventDefault();
    setPageNumber(i);
    try {
      if (!handle) return;
      // here we'll be making a network request, so we'll display progress here
      setIsLoading(true);
      // get the value from the state and make a get request to the Github API
      const { repo, total } = await fetchUserRepo(handle, i);
      setIsLoading(false);
      setData(repo);
      setTotalPages(total);
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
      {repoData.length > 0 &&
        repoData.map((e) => (
          <RepoDetails
            key={e._id}
            name={e.repo_name}
            description={e.description || "NA"}
            stars={e.star_count}
            link={e.repo_url}
          />
        ))}

      <div className={styles.paginated}>
        {pages.map((e, i) => {
          return (
            <button
              className={styles.paginated_button}
              onClick={(e) => {
                // setPageNumber(i);
                handleSearch(e, i);
              }}
              key={i}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </>
  );
}
