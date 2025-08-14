const express = require("express")
const router = express.Router()
const {
  getAllTeamMembers,
  getTeamMembersByPosition,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  clearAllTeamMembers, // Added clear function import
} = require("../controllers/teamController")

// Get all team members
router.get("/", getAllTeamMembers)

// Get team members by position
router.get("/position/:position", getTeamMembersByPosition)

// Get single team member
router.get("/:id", getTeamMember)

// Create team member
router.post("/", createTeamMember)

// Update team member
router.put("/:id", updateTeamMember)

// Delete team member
router.delete("/:id", deleteTeamMember)

router.delete("/clear-all", clearAllTeamMembers)

module.exports = router
