import app from './app'
import {configDotenv} from 'dotenv'
configDotenv()

const PORT = process.env.PORT

app.listen(() => {
  console.log('Server running on PORT:', PORT)
})