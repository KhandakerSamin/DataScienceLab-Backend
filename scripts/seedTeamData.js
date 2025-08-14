const { MongoClient } = require("mongodb")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ds_lab_portfolio"

const teamMembers = [
  {
    name: "Dr. Md. Sabur Khan",
    position: "Chief Advisor",
    photo: "/soborkhan.jpg",
    bio: "Founder & Chairman Daffodil Family",
    linkedin: "https://linkedin.com",
    email: "john.doe@example.com",
    website: "https://johndoe.com",
    order: 1,
  },
  {
    name: "Dr.Imran Mahamud",
    position: "Advisor",
    photo: "/p1.png",
    bio: "Professor & Head Department of Software Engineering",
    linkedin: "https://linkedin.com",
    email: "jane.smith@example.com",
    order: 2,
  },
  {
    name: "Prof. Dr.Touhid Bhuiyan",
    position: "Advisor",
    photo: "/t3.jpg",
    bio: "Professor & Head Department of CSE",
    linkedin: "https://linkedin.com",
    email: "alice.johnson@example.com",
    order: 3,
  },
  {
    name: "Md. Shohel Arman",
    position: "Lab Incharge",
    bio: "Assistant Professor & Lab Incharge Data Science Lab",
    photo: "/p3.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    order: 4,
  },
  {
    name: "Ms. Nusrat Jahan",
    position: "Faculty",
    bio: "Assistant Professor",
    photo: "/t4.jpg",
    linkedin: "https://linkedin.com",
    email: "bob.wilson@example.com",
    order: 5,
  },
  {
    name: "Afsana Begum",
    position: "Faculty",
    bio: "Assistant Professor & Coordinator M.Sc",
    photo: "/t5.jpg",
    linkedin: "https://linkedin.com",
    email: "carol.brown@example.com",
    order: 6,
  },
  {
    name: "Ms. Farzana Sadia",
    bio: "Assistant Professor",
    position: "Faculty",
    photo: "/t6.jpg",
    linkedin: "https://linkedin.com",
    email: "david.lee@example.com",
    order: 7,
  },
  {
    name: "Mr. Musabbir Hasan Sammak",
    position: "Faculty",
    bio: "Lecturer (Senior Scale)",
    photo: "/p4.png",
    linkedin: "https://linkedin.com",
    email: "david.lee@example.com",
    order: 8,
  },
  {
    name: "Shihab Howlader",
    position: "Lab Associate",
    bio: "Lab Associates",
    photo: "/soborkhan.jpg",
    email: "grace.taylor@example.com",
    order: 9,
  },
  {
    name: "Meherin Khandakar Priya",
    position: "Lab Associate",
    bio: "Lab Associates",
    photo: "/soborkhan.jpg",
    email: "henry.adams@example.com",
    order: 10,
  },
  {
    name: "Khandaker Samin Yeasar",
    position: "Lab Associate",
    bio: "Lab Associates",
    photo: "/soborkhan.jpg",
    email: "henry.adams@example.com",
    order: 11,
  },
]

async function seedTeamData() {
  let client

  try {
    console.log("Connecting to MongoDB...")
    client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db()
    const collection = db.collection("team")

    // Clear existing data
    console.log("Clearing existing team data...")
    await collection.deleteMany({})

    // Add timestamps to team members
    const teamMembersWithTimestamps = teamMembers.map((member) => ({
      ...member,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    // Insert new data
    console.log("Inserting team data...")
    const result = await collection.insertMany(teamMembersWithTimestamps)

    console.log(`Successfully inserted ${result.insertedCount} team members`)
    console.log("Team data seeding completed!")
  } catch (error) {
    console.error("Error seeding team data:", error)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

// Run the seeding function
if (require.main === module) {
  seedTeamData()
}

module.exports = seedTeamData
