const express = require("express");
const app = express();
const cors = require("cors");
const prayerRoutes = require("./Routes/prayerRoute");

app.use(express.json());
app.use(cors());
app.use("/api", prayerRoutes);
const port = 6001;


app.listen(port, () => console.log(`server is running on port ${port}`))