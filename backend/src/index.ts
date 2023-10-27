import server from './app.js'
import {configDotenv} from 'dotenv'
configDotenv()

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('Server running on PORT:', PORT)
})