import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js'
import userRouter from './routes/userRoute.js'


await connectDB() //establish connection to the databasee

const app = express() //Initialize express application
app.use(cors())// enables cross-origin resource

//middleware setup
app.use(express.json()) //enables JSON request body parsing
app.use(clerkMiddleware())

//API to listen clerk Webhooks

app.use('/api/clerk', clerkWebhooks)

//Define API routes
app.use('/api/user', userRouter)

//route endpoint to check API status
app.get('/', (req, res) => {
  res.send("API successfully connected")
})

const port = process.env.PORT || 4000 //Define server port

//start the server
app.listen(port, () => console.log(`server is running at http://localhost:${port}`))