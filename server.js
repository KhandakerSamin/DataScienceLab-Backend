const express = require("express")
const cors = require("cors")
const multer = require("multer")
const FormData = require("form-data")
const fetch = require("node-fetch")
require("dotenv").config()

const { connectDB } = require("./db")
const eventsRoutes = require("./routes/eventsRoutes")
const projectsRoutes = require("./routes/projectsRoutes")
const clubEventsRoutes = require("./routes/clubEventsRoutes")
const teamRoutes = require("./routes/teamRoutes")
const clubMembersRoutes = require("./routes/clubMembersRoutes")
const galleryRoutes = require("./routes/galleryRoutes")

const app = express()
const PORT = process.env.PORT || 5000

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed!"), false)
    }
  },
})

// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.post("/api/upload", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, error: "File too large. Maximum size is 5MB." })
      }
      return res.status(400).json({ success: false, error: err.message })
    } else if (err) {
      console.error("Upload error:", err)
      return res.status(400).json({ success: false, error: err.message })
    }

    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" })
      }

      const imagebbApiKey = process.env.IMAGEBB_API_KEY
      if (!imagebbApiKey) {
        console.error("ImageBB API key not found")
        return res.status(500).json({ success: false, error: "Image hosting service not configured" })
      }

      const formData = new FormData()
      formData.append("image", req.file.buffer.toString("base64"))

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imagebbApiKey}`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        console.error("ImageBB upload failed:", result)
        return res.status(500).json({ success: false, error: "Failed to upload image to hosting service" })
      }

      const imageUrl = result.data.url
      console.log("Image uploaded successfully to ImageBB:", {
        filename: req.file.originalname,
        size: req.file.size,
        url: imageUrl,
        imagebbId: result.data.id,
      })

      res.json({
        success: true,
        data: {
          url: imageUrl,
          filename: req.file.originalname,
          originalName: req.file.originalname,
          size: req.file.size,
          imagebbId: result.data.id,
        },
      })
    } catch (error) {
      console.error("Server error during ImageBB upload:", error)
      res.status(500).json({ success: false, error: "Internal server error during image upload" })
    }
  })
})

// Routes
app.use("/api/events", eventsRoutes)
app.use("/api/projects", projectsRoutes)
app.use("/api/clubEvents", clubEventsRoutes)
app.use("/api/team", teamRoutes)
app.use("/api/clubMembers", clubMembersRoutes)
app.use("/api/gallery", galleryRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "DS Lab Backend is running!", timestamp: new Date().toISOString() })
})

app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack)

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, error: err.message })
  }

  res.status(500).json({ success: false, error: "Something went wrong!" })
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
