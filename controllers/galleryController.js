const { getDB } = require("../db")
const { ObjectId } = require("mongodb")

// Get all gallery images
const getAllGalleryImages = async (req, res) => {
  try {
    const db = getDB()
    const images = await db.collection("gallery").find({}).sort({ order: 1, createdAt: -1 }).toArray()

    res.json({
      success: true,
      data: images,
      total: images.length,
      count: images.length,
    })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch gallery images",
    })
  }
}

// Get gallery image by ID
const getGalleryImageById = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid gallery image ID",
      })
    }

    const image = await db.collection("gallery").findOne({ _id: new ObjectId(id) })

    if (!image) {
      return res.status(404).json({
        success: false,
        error: "Gallery image not found",
      })
    }

    res.json({
      success: true,
      data: image,
    })
  } catch (error) {
    console.error("Error fetching gallery image:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch gallery image",
    })
  }
}

// Create new gallery image
const createGalleryImage = async (req, res) => {
  try {
    const db = getDB()
    const imageData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("gallery").insertOne(imageData)

    res.status(201).json({
      success: true,
      data: { _id: result.insertedId, ...imageData },
      message: "Gallery image created successfully",
    })
  } catch (error) {
    console.error("Error creating gallery image:", error)
    res.status(500).json({
      success: false,
      error: "Failed to create gallery image",
    })
  }
}

// Update gallery image
const updateGalleryImage = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid gallery image ID",
      })
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    }

    // Remove system fields
    delete updateData._id
    delete updateData.createdAt

    const result = await db.collection("gallery").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Gallery image not found",
      })
    }

    res.json({
      success: true,
      message: "Gallery image updated successfully",
    })
  } catch (error) {
    console.error("Error updating gallery image:", error)
    res.status(500).json({
      success: false,
      error: "Failed to update gallery image",
    })
  }
}

// Delete gallery image
const deleteGalleryImage = async (req, res) => {
  try {
    const db = getDB()
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid gallery image ID",
      })
    }

    const result = await db.collection("gallery").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Gallery image not found",
      })
    }

    res.json({
      success: true,
      message: "Gallery image deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    res.status(500).json({
      success: false,
      error: "Failed to delete gallery image",
    })
  }
}

// Clear all gallery images
const clearAllGalleryImages = async (req, res) => {
  try {
    const db = getDB()
    const result = await db.collection("gallery").deleteMany({})

    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} gallery images successfully`,
    })
  } catch (error) {
    console.error("Error clearing gallery images:", error)
    res.status(500).json({
      success: false,
      error: "Failed to clear gallery images",
    })
  }
}

module.exports = {
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  clearAllGalleryImages,
}
