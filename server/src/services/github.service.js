import axios from 'axios'

const fetchUserFromGithub = async (user) => {
  let userData
  try {
    userData = await axios.get(`https://api.github.com/users/${user}`)
  } catch (error) {
    if (error.response) {
      throw new Error('Failed to fetch')
    }
  }
  return userData.data
}

const fetchRepoListFromGithub = async (user) => {
  let repoList
  try {
    repoList = await axios.get(`https://api.github.com/users/${user}/repos`)
  } catch (error) {
    if (error.response) {
      throw new Error('Failed to fetch')
    }
  }
  return repoList.data
}

export default fetchUserFromGithub
export { fetchRepoListFromGithub }
