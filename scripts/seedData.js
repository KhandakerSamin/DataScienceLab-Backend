// Run this script to seed initial data into your MongoDB collections
const { connectDB, closeDB } = require("../db")

const sampleClubData = [
  {
    name: "Data Science Club DIU",
    description:
      "A community of data enthusiasts exploring the world of data science, machine learning, and artificial intelligence.",
    established: "2020",
    members: 150,
    activities: ["Workshops", "Research Projects", "Competitions", "Seminars"],
    contact: {
      email: "dsclub@diu.edu.bd",
      phone: "+880-123-456-789",
    },
    socialMedia: {
      facebook: "https://facebook.com/dsclub.diu",
      linkedin: "https://linkedin.com/company/dsclub-diu",
    },
    advisors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    achievements: ["Best Data Science Club 2023", "Published 15+ research papers", "Organized 25+ workshops"],
  },
]

const sampleEventsData = [
  {
    id: 1,
    type: "event",
    title: "Machine Learning Workshop: Deep Learning Fundamentals",
    date: "2025-07-15",
    time: "10:00 AM - 4:00 PM",
    location: "Data Science Lab, Room 301",
    description:
      "Join us for an intensive workshop covering the fundamentals of deep learning, including neural networks, backpropagation, and practical implementations.",
    fullDescription:
      "This comprehensive workshop will cover the theoretical foundations and practical applications of deep learning. Participants will learn about neural network architectures, optimization techniques, and hands-on implementation using popular frameworks like TensorFlow and PyTorch.",
    image: "/eventImage.jpg",
    tags: ["Workshop", "Deep Learning", "Hands-on"],
    speakers: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    capacity: "50 participants",
    registrationLink: "https://forms.google.com/ml-workshop-registration",
  },
  {
    id: 2,
    type: "news",
    title: "Research Paper Published in Nature Machine Intelligence",
    date: "2025-08-10",
    description:
      "Our latest research on interpretable AI models has been accepted for publication in Nature Machine Intelligence.",
    fullDescription:
      "We are excited to announce that our groundbreaking research on developing interpretable artificial intelligence models has been accepted for publication in Nature Machine Intelligence.",
    image: "/newsimage.png",
    tags: ["Publication", "Research", "AI Ethics"],
    authors: ["Dr. Emily Watson", "Dr. James Liu", "Prof. Anna Kowalski"],
    registrationLink: null,
  },
]

const sampleProjectsData = [
  {
    id: 1,
    title:
      "A Machine Learning Approach for Sentiment Analysis of Customer Satisfaction of Bangladeshi Delivery Services",
    description:
      "Bangladesh has a large population which is causing the delivery system growing up day by day. Therefore, some companies who provide these delivery services need to know about their customer satisfaction.",
    image: "/project0.jpeg",
    status: "completed",
    technologies: ["Python", "Machine Learning", "NLP", "Sentiment Analysis"],
    duration: "6 months",
    teamSize: "4 members",
    category: "Research",
    links: {
      demo: "https://example.com/sentiment-demo",
      github: "https://github.com/username/sentiment-analysis",
      researchPaper: "https://example.com/research-paper.pdf",
      live: "https://sentiment-analysis-live.com",
      frontend: "https://github.com/username/sentiment-frontend",
      backend: "https://github.com/username/sentiment-backend",
    },
  },
  {
    id: 2,
    title: "E-Commerce Platform with AI Recommendations",
    description:
      "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration.",
    image: "/project2.png",
    status: "completed",
    technologies: ["React", "Node.js", "MongoDB", "AI/ML"],
    duration: "8 months",
    teamSize: "5 members",
    category: "Web Development",
    links: {
      demo: "https://example.com/ecommerce-demo",
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-live.com",
      frontend: "https://github.com/username/ecommerce-frontend",
      backend: "https://github.com/username/ecommerce-backend",
    },
  },
]

const sampleClubEventsData = [
  {
    title: "Python for Data Science Bootcamp",
    date: "2025-12-15",
    time: "9:00 AM - 5:00 PM",
    location: "Computer Lab 1",
    shortDescription: "Intensive bootcamp covering Python fundamentals for data science applications.",
    fullDescription:
      "This comprehensive bootcamp will teach you Python programming specifically for data science. You'll learn pandas, numpy, matplotlib, and scikit-learn through hands-on projects.",
    image: "/python-bootcamp.jpg",
    instructor: "Dr. Sarah Chen",
    instructorBio: "PhD in Computer Science with 10+ years experience in data science",
    duration: "8 hours",
    price: "Free",
    difficulty: "Beginner",
    maxParticipants: 30,
    registrationDeadline: "2025-12-10",
    prerequisites: "Basic computer skills",
    tags: ["Python", "Data Science", "Bootcamp"],
    outcomes: ["Python basics", "Data manipulation with pandas", "Data visualization", "Basic machine learning"],
    materials: ["Laptop", "Python installed", "Jupyter notebook"],
    certificate: true,
    isUpcoming: true,
    registrationLink: "https://forms.google.com/python-bootcamp-registration",
  },
]

// Update the seedDatabase function to include club events
const seedDatabase = async () => {
  try {
    const db = await connectDB()

    // Clear existing data
    await db.collection("club").deleteMany({})
    await db.collection("events").deleteMany({})
    await db.collection("projects").deleteMany({})
    await db.collection("clubEvents").deleteMany({})

    // Insert sample data
    await db.collection("club").insertMany(sampleClubData)
    await db.collection("events").insertMany(sampleEventsData)
    await db.collection("projects").insertMany(sampleProjectsData)
    await db.collection("clubEvents").insertMany(sampleClubEventsData)

    console.log("Database seeded successfully!")
    console.log(`Inserted ${sampleClubData.length} club records`)
    console.log(`Inserted ${sampleEventsData.length} event records`)
    console.log(`Inserted ${sampleProjectsData.length} project records`)
    console.log(`Inserted ${sampleClubEventsData.length} club event records`)
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await closeDB()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase }
