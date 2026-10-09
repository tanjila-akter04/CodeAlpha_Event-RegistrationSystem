
const express = require("express");

const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
} = require("../controllers/registrationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register for an event
router.post("/:eventId", protect, registerForEvent);

// Get my registrations
router.get("/my", protect, getMyRegistrations);

// Cancel registration
router.delete("/:id", protect, cancelRegistration);

module.exports = router;

