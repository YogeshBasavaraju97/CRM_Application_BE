require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express(); //middleware to body parser
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());



const auth = require("./routes/auth.js");
const leads = require("./routes/leads.js");
const admin = require("./routes/record.js");


app.use("/", auth);
app.use("/", leads);
app.use("/", admin);


connectDB()
  .then(() => {
    console.log("connection successfully established");
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log("server successfully started");
    });
  })
  .catch((error) => {
    console.log("Error while connecting");
  });