const { getDB } = require("../db")
const { ObjectId } = require("mongodb")

// Get all club members
const getAllClubMembers = async (req, res) => {
  try {
    const db = getDB()
    const clubMembers = await db.collection("clubMembers").find({}).sort({ order: 1, createdAt: -1 }).toArray()

    res.json({
      success: true,
      data: clubMembers,
      total: clubMembers.length,
      count: clubMembers.length,
    })
  } catch (error) {
    console.error("Error fetching club members:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch club members",
    })
  }
}

// Get club member by ID
const getClubMemberById = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid club member ID",
      })
    }

    const clubMember = await db.collection("clubMembers").findOne({ _id: new ObjectId(id) })

    if (!clubMember) {
      return res.status(404).json({
        success: false,
        error: "Club member not found",
      })
    }

    res.json({
      success: true,
      data: clubMember,
    })
  } catch (error) {
    console.error("Error fetching club member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch club member",
    })
  }
}

// Create new club member
const createClubMember = async (req, res) => {
  try {
    const db = getDB()
    const clubMemberData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("clubMembers").insertOne(clubMemberData)

    res.status(201).json({
      success: true,
      data: { _id: result.insertedId, ...clubMemberData },
      message: "Club member created successfully",
    })
  } catch (error) {
    console.error("Error creating club member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to create club member",
    })
  }
}

// Update club member
const updateClubMember = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid club member ID",
      })
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    }

    // Remove system fields
    delete updateData._id
    delete updateData.createdAt

    const result = await db.collection("clubMembers").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Club member not found",
      })
    }

    res.json({
      success: true,
      message: "Club member updated successfully",
    })
  } catch (error) {
    console.error("Error updating club member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to update club member",
    })
  }
}

// Delete club member
const deleteClubMember = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid club member ID",
      })
    }

    const result = await db.collection("clubMembers").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Club member not found",
      })
    }

    res.json({
      success: true,
      message: "Club member deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting club member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to delete club member",
    })
  }
}

// Clear all club members
const clearAllClubMembers = async (req, res) => {
  try {
    const db = getDB()
    const result = await db.collection("clubMembers").deleteMany({})

    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} club members successfully`,
    })
  } catch (error) {
    console.error("Error clearing club members:", error)
    res.status(500).json({
      success: false,
      error: "Failed to clear club members",
    })
  }
}

module.exports = {
  getAllClubMembers,
  getClubMemberById,
  createClubMember,
  updateClubMember,
  deleteClubMember,
  clearAllClubMembers,
}
