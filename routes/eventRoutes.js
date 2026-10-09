const express = require("express");

const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all events
router.get("/", getAllEvents);

// Get single event
router.get("/:id", getEventById);

// Create event - Login required
router.post("/", protect, createEvent);

// Update event - Login required
router.put("/:id", protect, updateEvent);

// Delete event - Login required
router.delete("/:id", protect, deleteEvent);

module.exports = router;
