const express = require("express")
const router = express.Router()
const {
  getAllClubMembers,
  getClubMemberById,
  createClubMember,
  updateClubMember,
  deleteClubMember,
  clearAllClubMembers,
} = require("../controllers/clubMembersController")

// GET /api/clubMembers - Get all club members
router.get("/", getAllClubMembers)

// GET /api/clubMembers/:id - Get club member by ID
router.get("/:id", getClubMemberById)

// POST /api/clubMembers - Create new club member
router.post("/", createClubMember)

// PUT /api/clubMembers/:id - Update club member
router.put("/:id", updateClubMember)

// DELETE /api/clubMembers/:id - Delete club member
router.delete("/:id", deleteClubMember)

// DELETE /api/clubMembers/clear-all - Clear all club members
router.delete("/clear-all", clearAllClubMembers)

module.exports = router
