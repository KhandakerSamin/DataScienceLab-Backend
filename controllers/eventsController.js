const { getDB } = require("../db")
const { ObjectId } = require("mongodb")

const eventsController = {
  // Get all events and news
  getAllEvents: async (req, res) => {
    try {
      const db = getDB()
      const { type, limit, skip } = req.query

      const query = {}
      if (type) {
        query.type = type
      }

      let cursor = db.collection("events").find(query).sort({ date: -1 })

      if (skip) {
        cursor = cursor.skip(Number.parseInt(skip))
      }

      if (limit) {
        cursor = cursor.limit(Number.parseInt(limit))
      }

      const events = await cursor.toArray()
      const total = await db.collection("events").countDocuments(query)

      res.json({
        success: true,
        data: events,
        total,
        count: events.length,
      })
    } catch (error) {
      console.error("Error fetching events:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch events",
      })
    }
  },

  // Get single event by ID
  getEventById: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const event = await db.collection("events").findOne({ _id: new ObjectId(id) })

      if (!event) {
        return res.status(404).json({
          success: false,
          error: "Event not found",
        })
      }

      res.json({
        success: true,
        data: event,
      })
    } catch (error) {
      console.error("Error fetching event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch event",
      })
    }
  },

  // Create new event
  createEvent: async (req, res) => {
    try {
      const db = getDB()
      const eventData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection("events").insertOne(eventData)

      res.status(201).json({
        success: true,
        data: {
          _id: result.insertedId,
          ...eventData,
        },
      })
    } catch (error) {
      console.error("Error creating event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to create event",
      })
    }
  },

  // Update event
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const updateData = {
        ...req.body,
        updatedAt: new Date(),
      }

      const result = await db.collection("events").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Event not found",
        })
      }

      res.json({
        success: true,
        message: "Event updated successfully",
      })
    } catch (error) {
      console.error("Error updating event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to update event",
      })
    }
  },

  // Delete event
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Event not found",
        })
      }

      res.json({
        success: true,
        message: "Event deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to delete event",
      })
    }
  },

  // Get events by type (event or news)
  getEventsByType: async (req, res) => {
    try {
      const { type } = req.params
      const db = getDB()

      const events = await db.collection("events").find({ type }).sort({ date: -1 }).toArray()

      res.json({
        success: true,
        data: events,
        count: events.length,
      })
    } catch (error) {
      console.error("Error fetching events by type:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch events by type",
      })
    }
  },
}

module.exports = eventsController
