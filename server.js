const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { connectDB } = require("./db")
const clubRoutes = require("./routes/clubRoutes")
const eventsRoutes = require("./routes/eventsRoutes")
const projectsRoutes = require("./routes/projectsRoutes")
const clubEventsRoutes = require("./routes/clubEventsRoutes")

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Routes
app.use("/api/club", clubRoutes)
app.use("/api/events", eventsRoutes)
app.use("/api/projects", projectsRoutes)
app.use("/api/clubEvents", clubEventsRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "DS Lab Backend is running!", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
