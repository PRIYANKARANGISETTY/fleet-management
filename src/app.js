const express = require("express");

const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const tripRoutes = require("./routes/trip.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("Fleet Management API Running");
});

module.exports = app;
