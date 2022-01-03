import axios from "axios";

const fetchUser = async (handle) => {
  try {
    let { data } = await axios.get(`http://localhost:3300/${handle}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchUserRepo = async (handle, page) => {
  try {
    let { data } = await axios.get(
      `http://localhost:3300/repo/${handle}?page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchUser, fetchUserRepo };
