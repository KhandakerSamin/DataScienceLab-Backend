const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const { connectDB } = require("./db")
const eventsRoutes = require("./routes/eventsRoutes")
const projectsRoutes = require("./routes/projectsRoutes")
const clubEventsRoutes = require("./routes/clubEventsRoutes")

const app = express()
const PORT = process.env.PORT || 5000

const uploadsDir = "uploads"
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log("Created uploads directory")
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.post("/api/upload", (req, res) => {
  upload.single("image")(req, res, (err) => {
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

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`
      const fileUrl = `${baseUrl}/uploads/${req.file.filename}`

      console.log("File uploaded successfully:", {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
        path: req.file.path,
      })

      if (!fs.existsSync(req.file.path)) {
        console.error("File was not saved properly:", req.file.path)
        return res.status(500).json({ success: false, error: "File upload failed - file not saved" })
      }

      res.json({
        success: true,
        data: {
          url: fileUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
        },
      })
    } catch (error) {
      console.error("Server error during upload:", error)
      res.status(500).json({ success: false, error: "Internal server error during file upload" })
    }
  })
})

app.get("/api/verify-image/:filename", (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(__dirname, "uploads", filename)

    if (fs.existsSync(filePath)) {
      res.json({ success: true, exists: true })
    } else {
      res.json({ success: true, exists: false })
    }
  } catch (error) {
    console.error("Error verifying image:", error)
    res.status(500).json({ success: false, error: "Failed to verify image" })
  }
})

// Routes
app.use("/api/events", eventsRoutes)
app.use("/api/projects", projectsRoutes)
app.use("/api/clubEvents", clubEventsRoutes)

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
