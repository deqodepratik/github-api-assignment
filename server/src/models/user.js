import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  numberOfRepos: {
    type: Number,
    required: true,
  },
  memberSince: {
    type: Date,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
})

export default mongoose.model('User', userSchema)
