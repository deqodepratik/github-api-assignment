// import Joi from 'joi'
import { fetchRepoListFromDb, fetchUserFromDb } from '../services/user.service'

// creating a joi schema for validating username
// const schema = Joi.object().keys({
//   user: Joi.string().alphanum().min(3).max(30).required(),
// })

// check for user in the database
const checkUser = async (req, res, next) => {
  try {
    const { user } = req.params
    // const result = Joi.validate({ user }, schema)
    // if (result.error) return res.status(404).json({ msg: 'Invalid username' })
    const userData = await fetchUserFromDb(user)
    if (userData)
      return res.status(200).json({
        user: userData,
      })

    return next()
  } catch (error) {
    return res.status(404).json({ msg: 'Something went wrong here' })
  }
}

// check for repo list in database
const checkRepo = async (req, res, next) => {
  try {
    const { user } = req.params
    // const result = Joi.validate({ user }, schema)
    // if (result.error) return res.status(404).json({ msg: 'Invalid username' })
    const { page } = req.query
    const { repo: repoArray, total } = await fetchRepoListFromDb(user, page)
    if (total > 0)
      return res
        .status(200)
        .json({ repo: repoArray, total: Math.ceil(total / 10) })
    return next()
  } catch (error) {
    return res.status(404).json({ msg: 'Something went wrong' })
  }
}

export { checkUser, checkRepo }
