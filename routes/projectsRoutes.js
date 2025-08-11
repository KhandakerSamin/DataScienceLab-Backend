const express = require("express")
const projectsController = require("../controllers/projectsController")

const router = express.Router()

// GET /api/projects - Get all projects (with optional query params)
router.get("/", projectsController.getAllProjects)

// GET /api/projects/status/:status - Get projects by status
router.get("/status/:status", projectsController.getProjectsByStatus)

// GET /api/projects/category/:category - Get projects by category
router.get("/category/:category", projectsController.getProjectsByCategory)

// GET /api/projects/:id - Get single project by ID
router.get("/:id", projectsController.getProjectById)

// POST /api/projects - Create new project
router.post("/", projectsController.createProject)

// PUT /api/projects/:id - Update project
router.put("/:id", projectsController.updateProject)

// DELETE /api/projects/:id - Delete project
router.delete("/:id", projectsController.deleteProject)

module.exports = router
