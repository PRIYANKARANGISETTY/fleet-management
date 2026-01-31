const express = require("express");
const supabase = require("../config/supabase");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const router = express.Router();

// Create trip
router.post("/", auth, role(["admin", "manager"]), async (req, res) => {
  const { vehicle_id, driver_id, start_location, end_location, status } = req.body;

  const { data, error } = await supabase.from("trips").insert([
    { vehicle_id, driver_id, start_location, end_location, status }
  ]);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Trip created", data });
});

// Get trips
router.get("/", auth, async (req, res) => {
  const { data } = await supabase.from("trips").select("*");
  res.json(data);
});

module.exports = router;
