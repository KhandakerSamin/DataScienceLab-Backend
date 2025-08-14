const { MongoClient, ObjectId } = require("mongodb")
const { getDB } = require("../db")

const seedTeamMembers = [
  {
    name: "Dr. Md. Sabur Khan",
    position: "Chief Advisor",
    image: "/soborkhan.jpg",
    bio: "Founder & Chairman Daffodil Family",
    linkedin: "https://linkedin.com",
    email: "john.doe@example.com",
    website: "https://johndoe.com",
    order: 1,
  },
  {
    name: "Dr.Imran Mahamud",
    position: "Advisor",
    image: "/p1.png",
    bio: "Professor & Head Department of Software Engineering",
    linkedin: "https://linkedin.com",
    email: "jane.smith@example.com",
    order: 2,
  },
  {
    name: "Prof. Dr.Touhid Bhuiyan",
    position: "Advisor",
    image: "/t3.jpg",
    bio: "Professor & Head Department of CSE",
    linkedin: "https://linkedin.com",
    email: "alice.johnson@example.com",
    order: 3,
  },
  {
    name: "Md. Shohel Arman",
    position: "Lab Incharge",
    bio: "Assistant Professor & Lab Incharge Data Science Lab",
    image: "/p3.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    order: 4,
  },
  {
    name: "Ms. Nusrat Jahan",
    position: "Faculty",
    bio: "Assistant Professor",
    image: "/t4.jpg",
    linkedin: "https://linkedin.com",
    email: "bob.wilson@example.com",
    order: 5,
  },
  {
    name: "Afsana Begum",
    position: "Faculty",
    bio: "Assistant Professor & Coordinator M.Sc",
    image: "/t5.jpg",
    linkedin: "https://linkedin.com",
    email: "carol.brown@example.com",
    order: 6,
  },
  {
    name: "Ms. Farzana Sadia",
    bio: "Assistant Professor",
    position: "Faculty",
    image: "/t6.jpg",
    linkedin: "https://linkedin.com",
    email: "david.lee@example.com",
    order: 7,
  },
  {
    name: "Mr. Musabbir Hasan Sammak",
    position: "Faculty",
    bio: "Lecturer (Senior Scale)",
    image: "/p4.png",
    linkedin: "https://linkedin.com",
    email: "david.lee@example.com",
    order: 8,
  },
  {
    name: "Shihab Howlader",
    position: "Lab Associate",
    bio: "Lab Associates",
    image: "/soborkhan.jpg",
    email: "grace.taylor@example.com",
    order: 9,
  },
  {
    name: "Meherin Khandakar Priya",
    position: "Lab Associate",
    bio: "Lab Associates",
    image: "/soborkhan.jpg",
    email: "henry.adams@example.com",
    order: 10,
  },
  {
    name: "Khandaker Samin Yeasar",
    position: "Lab Associate",
    bio: "Lab Associates",
    image: "/soborkhan.jpg",
    email: "henry.adams@example.com",
    order: 11,
  },
]

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const db = getDB()

    const teamMembers = await db.collection("team").find({}).sort({ order: 1, createdAt: -1 }).toArray()

    res.json({
      success: true,
      data: teamMembers,
      total: teamMembers.length,
      count: teamMembers.length,
    })
  } catch (error) {
    console.error("Error fetching team members:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch team members",
    })
  }
}

// Get team members by position
const getTeamMembersByPosition = async (req, res) => {
  try {
    const { position } = req.params
    const db = getDB()

    const teamMembers = await db
      .collection("team")
      .find({ position: position })
      .sort({ order: 1, createdAt: -1 })
      .toArray()

    res.json({
      success: true,
      data: teamMembers,
      total: teamMembers.length,
      count: teamMembers.length,
    })
  } catch (error) {
    console.error("Error fetching team members by position:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch team members",
    })
  }
}

// Get single team member
const getTeamMember = async (req, res) => {
  try {
    const { id } = req.params
    const db = getDB()

    const teamMember = await db.collection("team").findOne({ _id: new ObjectId(id) })

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        error: "Team member not found",
      })
    }

    res.json({
      success: true,
      data: teamMember,
    })
  } catch (error) {
    console.error("Error fetching team member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch team member",
    })
  }
}

// Create team member
const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      position,
      bio,
      image,
      linkedin,
      email,
      github,
      website,
      googleScholar,
      facebook,
      twitter,
      instagram,
      otherLink,
      order,
    } = req.body

    // Validation
    if (!name || !position) {
      return res.status(400).json({
        success: false,
        error: "Name and position are required",
      })
    }

    const db = getDB()

    const newTeamMember = {
      name,
      position,
      bio: bio || "",
      image: image || "",
      linkedin: linkedin || "",
      email: email || "",
      github: github || "",
      website: website || "",
      googleScholar: googleScholar || "",
      facebook: facebook || "",
      twitter: twitter || "",
      instagram: instagram || "",
      otherLink: otherLink || "",
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("team").insertOne(newTeamMember)

    const createdTeamMember = await db.collection("team").findOne({ _id: result.insertedId })

    res.status(201).json({
      success: true,
      data: createdTeamMember,
      message: "Team member created successfully",
    })
  } catch (error) {
    console.error("Error creating team member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to create team member",
    })
  }
}

// Update team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    // Remove system fields
    delete updateData._id
    delete updateData.createdAt

    // Add updated timestamp
    updateData.updatedAt = new Date()

    const db = getDB()

    const result = await db.collection("team").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Team member not found",
      })
    }

    const updatedTeamMember = await db.collection("team").findOne({ _id: new ObjectId(id) })

    res.json({
      success: true,
      data: updatedTeamMember,
      message: "Team member updated successfully",
    })
  } catch (error) {
    console.error("Error updating team member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to update team member",
    })
  }
}

// Delete team member
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params
    const db = getDB()

    const result = await db.collection("team").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Team member not found",
      })
    }

    res.json({
      success: true,
      message: "Team member deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting team member:", error)
    res.status(500).json({
      success: false,
      error: "Failed to delete team member",
    })
  }
}

// Clear all team members
const clearAllTeamMembers = async (req, res) => {
  try {
    const db = getDB()

    const result = await db.collection("team").deleteMany({})

    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} team members`,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Error clearing team members:", error)
    res.status(500).json({
      success: false,
      error: "Failed to clear team members",
    })
  }
}

module.exports = {
  getAllTeamMembers,
  getTeamMembersByPosition,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  clearAllTeamMembers,
}
