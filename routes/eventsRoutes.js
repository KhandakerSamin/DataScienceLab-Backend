const express = require("express")
const eventsController = require("../controllers/eventsController")

const router = express.Router()

// GET /api/events - Get all events and news (with optional query params)
router.get("/", eventsController.getAllEvents)

// GET /api/events/type/:type - Get events by type (event or news)
router.get("/type/:type", eventsController.getEventsByType)

// GET /api/events/:id - Get single event by ID
router.get("/:id", eventsController.getEventById)

// POST /api/events - Create new event
router.post("/", eventsController.createEvent)

// PUT /api/events/:id - Update event
router.put("/:id", eventsController.updateEvent)

// DELETE /api/events/:id - Delete event
router.delete("/:id", eventsController.deleteEvent)

module.exports = router
