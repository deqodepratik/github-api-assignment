import { get } from 'lodash'
import fetchUserFromGithub, {
  fetchRepoListFromGithub,
} from '../services/github.service'
import addNewUser, { addNewRepoList } from '../services/user.service'

const fetchUser = async (req, res) => {
  try {
    const { user } = req.params
    // fetch user from Github API
    const githubUser = await fetchUserFromGithub(user)
    // add that user to db
    const newUser = await addNewUser(githubUser)
    return res.status(201).json({ user: newUser })
  } catch (error) {
    return res.status(404).json({ msg: 'Something went wrong' })
  }
}

const fetchRepoDetails = async (req, res) => {
  try {
    const { user } = req.params
    // fetching the data from Github API
    const repoArray = await fetchRepoListFromGithub(user)
    // add the array of data in the database
    const dataArr = []
    repoArray.map((obj) => {
      const name = get(obj, 'name')
      const owner = get(obj, 'owner.login')
      const description = get(obj, 'description') || 'NA'
      const stars = get(obj, 'stargazers_count')
      const link = get(obj, 'svn_url')

      dataArr.push({
        repo_name: name,
        owner_name: owner.toLowerCase(),
        description,
        star_count: stars,
        repo_url: link,
      })
      return 0
    })

    // here we have the data so we can push the data in the database
    await addNewRepoList(dataArr)
    const total = dataArr.length

    return res
      .status(200)
      .json({ repo: dataArr.slice(0, 10), total: Math.ceil(total / 10) })
  } catch (error) {
    return res.status(404).json({ msg: 'Something went wrong' })
  }
}

export default fetchUser
export { fetchRepoDetails }
