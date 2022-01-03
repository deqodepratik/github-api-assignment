import mongoose from 'mongoose'

const { Schema } = mongoose

const repoSchema = new Schema({
  repo_name: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  star_count: {
    type: String,
  },
  repo_url: {
    type: String,
  },
})

export default mongoose.model('Repo', repoSchema)
