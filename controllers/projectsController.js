const { getDB } = require("../db")
const { ObjectId } = require("mongodb")

const projectsController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const db = getDB()
      const { status, category, limit, skip } = req.query

      const query = {}
      if (status) {
        query.status = status
      }
      if (category) {
        query.category = category
      }

      let cursor = db.collection("projects").find(query).sort({ createdAt: -1 })

      if (skip) {
        cursor = cursor.skip(Number.parseInt(skip))
      }

      if (limit) {
        cursor = cursor.limit(Number.parseInt(limit))
      }

      const projects = await cursor.toArray()
      const total = await db.collection("projects").countDocuments(query)

      res.json({
        success: true,
        data: projects,
        total,
        count: projects.length,
      })
    } catch (error) {
      console.error("Error fetching projects:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch projects",
      })
    }
  },

  // Get single project by ID
  getProjectById: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const project = await db.collection("projects").findOne({ _id: new ObjectId(id) })

      if (!project) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        })
      }

      res.json({
        success: true,
        data: project,
      })
    } catch (error) {
      console.error("Error fetching project:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch project",
      })
    }
  },

  // Create new project
  createProject: async (req, res) => {
    try {
      const db = getDB()
      const projectData = {
        ...req.body,
        links: {
          live: req.body.liveLink || null,
          github: req.body.githubLink || null,
          researchPaper: req.body.researchPaperLink || null,
          ...req.body.links,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection("projects").insertOne(projectData)

      res.status(201).json({
        success: true,
        data: {
          _id: result.insertedId,
          ...projectData,
        },
      })
    } catch (error) {
      console.error("Error creating project:", error)
      res.status(500).json({
        success: false,
        error: "Failed to create project",
      })
    }
  },

  // Update project
  updateProject: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const updateData = {
        ...req.body,
        links: {
          live: req.body.liveLink || null,
          github: req.body.githubLink || null,
          researchPaper: req.body.researchPaperLink || null,
          ...req.body.links,
        },
        updatedAt: new Date(),
      }

      const result = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        })
      }

      res.json({
        success: true,
        message: "Project updated successfully",
      })
    } catch (error) {
      console.error("Error updating project:", error)
      res.status(500).json({
        success: false,
        error: "Failed to update project",
      })
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params
      const db = getDB()

      const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        })
      }

      res.json({
        success: true,
        message: "Project deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting project:", error)
      res.status(500).json({
        success: false,
        error: "Failed to delete project",
      })
    }
  },

  // Get projects by status
  getProjectsByStatus: async (req, res) => {
    try {
      const { status } = req.params
      const db = getDB()

      const projects = await db.collection("projects").find({ status }).sort({ createdAt: -1 }).toArray()

      res.json({
        success: true,
        data: projects,
        count: projects.length,
      })
    } catch (error) {
      console.error("Error fetching projects by status:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch projects by status",
      })
    }
  },

  // Get projects by category
  getProjectsByCategory: async (req, res) => {
    try {
      const { category } = req.params
      const db = getDB()

      const projects = await db.collection("projects").find({ category }).sort({ createdAt: -1 }).toArray()

      res.json({
        success: true,
        data: projects,
        count: projects.length,
      })
    } catch (error) {
      console.error("Error fetching projects by category:", error)
      res.status(500).json({
        success: false,
        error: "Failed to fetch projects by category",
      })
    }
  },
}

module.exports = projectsController
