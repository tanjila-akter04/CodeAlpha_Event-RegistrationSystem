const Registration = require("../models/Registration");
const Event = require("../models/Event");

// Register for an event
const registerForEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        
          // Check event capacity
        const registeredCount = await Registration.countDocuments({
        event: eventId,
        status: "registered"
         
        });

        if (registeredCount >= event.capacity) {
        return res.status(400).json({
        message: "Sorry, this event is fully booked"
        });
}



        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You have already registered for this event"
            });
        }

        const registration = await Registration.create({
            user: userId,
            event: eventId
        });

        res.status(201).json({
            message: "Event registration successful",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// Get my registrations
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({
            user: req.user.id
        })
            .populate("event")
            .populate("user", "name email");

        res.status(200).json({
            message: "Your registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });
    }
};


// Cancel registration
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        if (registration.status === "cancelled") {
            return res.status(400).json({
                message: "Registration is already cancelled"
            });
        }

        registration.status = "cancelled";

        await registration.save();

        res.status(200).json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel registration",
            error: error.message
        });
    }
};


module.exports = {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
};