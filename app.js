require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const morgan = require("morgan");
const { default: rateLimit } = require("express-rate-limit");
const { default: helmet } = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");


//middleware
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

//routea
const authenticationRoute = require('./routes/authentication_route')
const profileRoute = require('./routes/profile_route')

app.use(rateLimit());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => res.send("Folksy server"));

app.use('/api/v1/auth', authenticationRoute)
app.use('/api/v1/profile',profileRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app