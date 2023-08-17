const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config({ path: "./config/config.env" });
const routes = require("./routes");
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api", routes);


app.listen(PORT, () => {
  console.log("server running on port "+PORT);
});