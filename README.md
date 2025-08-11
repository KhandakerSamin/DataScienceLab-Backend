# DS Lab Portfolio Backend

A Node.js backend API for managing Data Science Lab portfolio data including club information, events/news, and projects.

## Features

- **Club Management**: CRUD operations for club data
- **Events & News**: Manage events and news with filtering capabilities
- **Projects**: Full project management with status and category filtering
- **MongoDB Integration**: Native MongoDB driver (no Mongoose)
- **RESTful API**: Clean and consistent API endpoints
- **Error Handling**: Comprehensive error handling and validation

## Setup Instructions

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd ds-lab-backend
   npm install
   \`\`\`

2. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit `.env` and add your MongoDB URI:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/ds_lab_portfolio
   PORT=5000
   \`\`\`

3. **Start the Server**
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

4. **Seed Database (Optional)**
   \`\`\`bash
   node scripts/seedData.js
   \`\`\`

## API Endpoints

### Club Routes (`/api/club`)
- `GET /` - Get all club data
- `GET /:id` - Get club data by ID
- `POST /` - Create new club data
- `PUT /:id` - Update club data
- `DELETE /:id` - Delete club data

### Events Routes (`/api/events`)
- `GET /` - Get all events/news (supports query params: type, limit, skip)
- `GET /type/:type` - Get events by type (event/news)
- `GET /:id` - Get event by ID
- `POST /` - Create new event
- `PUT /:id` - Update event
- `DELETE /:id` - Delete event

### Projects Routes (`/api/projects`)
- `GET /` - Get all projects (supports query params: status, category, limit, skip)
- `GET /status/:status` - Get projects by status
- `GET /category/:category` - Get projects by category
- `GET /:id` - Get project by ID
- `POST /` - Create new project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project

## Example API Usage

### Create a new event:
\`\`\`bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "type": "event",
    "title": "AI Workshop",
    "date": "2025-12-01",
    "time": "10:00 AM - 2:00 PM",
    "location": "Lab 301",
    "description": "Introduction to AI concepts"
  }'
\`\`\`

### Get all completed projects:
\`\`\`bash
curl http://localhost:5000/api/projects/status/completed
\`\`\`

### Update club information:
\`\`\`bash
curl -X PUT http://localhost:5000/api/club/[club_id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Club Name",
    "members": 200
  }'
\`\`\`

## Database Collections

- **club**: Club information and details
- **events**: Events and news data
- **projects**: Project portfolio data

## Error Handling

All endpoints return consistent error responses:
\`\`\`json
{
  "success": false,
  "error": "Error message"
}
\`\`\`

## Success Responses

All successful responses follow this format:
\`\`\`json
{
  "success": true,
  "data": [...],
  "count": 10,
  "total": 50
}
