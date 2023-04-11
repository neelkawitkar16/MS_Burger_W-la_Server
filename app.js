import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { connectPassport } from "./utils/Provider.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"

const app = express()
export default app

dotenv.config({
  path: "./config/config.env"
})

// Using middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser())
app.use(express.json())
app.use(
  urlencoded({
    extended: true
  })
)

app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())

connectPassport()

// Importing Routes
import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"


app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)

app.use(errorMiddleware)
