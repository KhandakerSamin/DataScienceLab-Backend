const express = require("express")
const clubEventsController = require("../controllers/clubEventsController")

const router = express.Router()

// GET /api/clubEvents - Get all club events
router.get("/", clubEventsController.getAllClubEvents)

// GET /api/clubEvents/:id - Get single club event by ID
router.get("/:id", clubEventsController.getClubEventById)

// POST /api/clubEvents - Create new club event
router.post("/", clubEventsController.createClubEvent)

// PUT /api/clubEvents/:id - Update club event
router.put("/:id", clubEventsController.updateClubEvent)

// DELETE /api/clubEvents/:id - Delete club event
router.delete("/:id", clubEventsController.deleteClubEvent)

module.exports = router
