import Repo from '../models/repo'
import Users from '../models/user'

const addNewUser = async (user) => {
  try {
    const newUser = new Users({
      userName: user.login.toLowerCase(),
      image: user.avatar_url,
      followers: user.followers,
      following: user.following,
      numberOfRepos: user.public_repos,
      memberSince: user.created_at,
      html_url: user.html_url,
    })

    await newUser.save()
    return newUser
  } catch (error) {
    throw new Error('Failed to add new user')
  }
}

const addNewRepoList = async (repoList) => {
  try {
    const newRepoList = Repo.insertMany(repoList)
    return newRepoList
  } catch (error) {
    throw new Error('Failed to add repo list')
  }
}

const fetchUserFromDb = async (user) => {
  try {
    return await Users.findOne({ userName: user })
  } catch (error) {
    throw new Error('User not found')
  }
}

const fetchRepoListFromDb = async (user, page = 0) => {
  try {
    const repo = await Repo.find({ owner_name: user })
      .limit(10)
      .skip(10 * page)

    const total = await Repo.countDocuments({ owner_name: user })
    return { repo, total }
  } catch (error) {
    throw new Error('Failed to get repo list from db')
  }
}

export default addNewUser
export { fetchUserFromDb, fetchRepoListFromDb, addNewRepoList }
