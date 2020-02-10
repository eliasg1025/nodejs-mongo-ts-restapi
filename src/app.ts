import express, {Application} from 'express'
import morgan from 'morgan'

const app: Application = express()

// Settings
app.set('port', 8000 || process.env.PORT)

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

export default app