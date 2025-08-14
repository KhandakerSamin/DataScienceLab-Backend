const express = require("express")
const router = express.Router()
const {
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  clearAllGalleryImages,
} = require("../controllers/galleryController")

// GET /api/gallery - Get all gallery images
router.get("/", getAllGalleryImages)

// GET /api/gallery/:id - Get gallery image by ID
router.get("/:id", getGalleryImageById)

// POST /api/gallery - Create new gallery image
router.post("/", createGalleryImage)

// PUT /api/gallery/:id - Update gallery image
router.put("/:id", updateGalleryImage)

// DELETE /api/gallery/:id - Delete gallery image
router.delete("/:id", deleteGalleryImage)

// DELETE /api/gallery/clear-all - Clear all gallery images
router.delete("/clear-all", clearAllGalleryImages)

module.exports = router
