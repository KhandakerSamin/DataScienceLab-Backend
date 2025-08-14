const express = require("express")
const router = express.Router()
const {
  getAllTeamMembers,
  getTeamMembersByPosition,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
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

module.exports = router
