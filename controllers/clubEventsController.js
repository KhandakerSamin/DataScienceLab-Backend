const { getDB } = require("../db")
const { ObjectId } = require("mongodb")
const path = require("path")
const fs = require("fs")

const clubEventsController = {
  // Get all club events
  getAllClubEvents: async (req, res) => {
    try {
      const db = getDB()
      const { limit, skip } = req.query

      let cursor = db.collection("clubEvents").find({}).sort({ date: -1 })

      if (skip) {
        cursor = cursor.skip(Number.parseInt(skip))
      }

      if (limit) {
        cursor = cursor.limit(Number.parseInt(limit))
      }

      const clubEvents = await cursor.toArray()
      const total = await db.collection("clubEvents").countDocuments({})

      res.json({
        success: true,
        data: clubEvents,
        total,
        count: clubEvents.length,
      })
    } catch (error) {
      console.error("Error fetching club events:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch club events",
      })
    }
  },

  // Get single club event by ID
  getClubEventById: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const clubEvent = await db.collection("clubEvents").findOne({ _id: new ObjectId(id) })

      if (!clubEvent) {
        return res.status(404).json({
          success: false,
          error: "Club event not found",
        })
      }

      res.json({
        success: true,
        data: clubEvent,
      })
    } catch (error) {
      console.error("Error fetching club event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch club event",
      })
    }
  },

  // Create new club event
  createClubEvent: async (req, res) => {
    try {
      const db = getDB()
      console.log("Creating club event with data:", req.body)

      const imageUrl = req.body.image || null
      if (imageUrl) {
        // Extract filename from URL and verify it exists
        const filename = imageUrl.split("/").pop()
        const filePath = path.join(__dirname, "..", "uploads", filename)

        if (!fs.existsSync(filePath)) {
          console.warn("Image file does not exist on disk:", filePath)
          // Don't fail the request, but log the issue
        }
      }

      const clubEventData = {
        ...req.body,
        image: imageUrl,
        registrationLink: req.body.registrationLink || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      console.log("Final club event data to save:", {
        ...clubEventData,
        imageStatus: imageUrl ? "provided" : "none",
      })

      const result = await db.collection("clubEvents").insertOne(clubEventData)

      const savedEvent = await db.collection("clubEvents").findOne({ _id: result.insertedId })
      console.log("Saved event verification:", {
        id: result.insertedId,
        hasImage: !!savedEvent.image,
        imageUrl: savedEvent.image,
      })

      res.status(201).json({
        success: true,
        data: savedEvent,
      })
    } catch (error) {
      console.error("Error creating club event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to create club event",
      })
    }
  },

  // Update club event
  updateClubEvent: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      console.log("Updating club event with data:", req.body)

      const imageUrl = req.body.image || null
      if (imageUrl) {
        const filename = imageUrl.split("/").pop()
        const filePath = path.join(__dirname, "..", "uploads", filename)

        if (!fs.existsSync(filePath)) {
          console.warn("Image file does not exist on disk during update:", filePath)
        }
      }

      const updateData = {
        ...req.body,
        image: imageUrl,
        registrationLink: req.body.registrationLink || null,
        updatedAt: new Date(),
      }

      console.log("Final update data:", {
        ...updateData,
        imageStatus: imageUrl ? "provided" : "none",
      })

      const result = await db.collection("clubEvents").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Club event not found",
        })
      }

      const updatedEvent = await db.collection("clubEvents").findOne({ _id: new ObjectId(id) })

      console.log("Updated event verification:", {
        id: id,
        hasImage: !!updatedEvent.image,
        imageUrl: updatedEvent.image,
        modifiedCount: result.modifiedCount,
      })

      res.json({
        success: true,
        message: "Club event updated successfully",
        data: updatedEvent,
      })
    } catch (error) {
      console.error("Error updating club event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to update club event",
      })
    }
  },

  // Delete club event
  deleteClubEvent: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const result = await db.collection("clubEvents").deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Club event not found",
        })
      }

      res.json({
        success: true,
        message: "Club event deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting club event:", error)
      res.status(500).json({
        success: false,
        error: "Failed to delete club event",
      })
    }
  },
}

module.exports = clubEventsController
