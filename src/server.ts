import mongoose from 'mongoose'
import app from './app'
import Routes from './routes/Routes'
import dotenv from 'dotenv'
dotenv.config()

const mong_uri = process.env.MONGO_URL
const port = process.env.PORT

async function connect() {
  try {
    if (!mong_uri) {
      process.exit(1)
    }
    await mongoose
      .connect(mong_uri)
      .then(() => {
        if (process.env.NODE_ENV !== 'test') {
          app.listen(port, () => {
            console.log(`Server running on port: ${port}`)
          })
        }
        app.use('/', Routes)
      })
      .catch((err) => console.log(err))
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connect