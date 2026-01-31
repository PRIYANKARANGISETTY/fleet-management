const express = require("express");
const supabase = require("../config/supabase");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const router = express.Router();

// Create vehicle (Admin / Manager)
router.post("/", auth, role(["admin", "manager"]), async (req, res) => {
  const { vehicle_number, type, capacity, status } = req.body;

  const { data, error } = await supabase
    .from("vehicles")
    .insert([{ vehicle_number, type, capacity, status }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Vehicle added", data });
});

// Get all vehicles
router.get("/", auth, async (req, res) => {
  const { data } = await supabase.from("vehicles").select("*");
  res.json(data);
});

module.exports = router;
