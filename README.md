# TaskFlow - Backend Developer Assignment

A secure, scalable REST API for task management with Role-Based Access Control (RBAC).
Built as part of the Backend Developer Intern Assignment.

##  Live Demo
- **Frontend:** https://task-flow-three-gray.vercel.app/
- **Backend:** https://taskflow-backend-253z.onrender.com/

##  Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Atlas), JWT, Bcrypt
- **Frontend:** React, Tailwind CSS, Vite, Axios
- **Architecture:** MVC (Model-View-Controller)

##  Features
- **Authentication:** Secure Register/Login with Password Hashing & JWT.
- **RBAC:** Admin can manage all tasks; Users can only manage their own.
- **Scalability:** Codebase structured for modularity (Controllers, Routes, Services).

##  How to Run Locally

### 1. Clone the Repo
\`\`\`bash
git clone https://github.com/likhithhhh/TaskFlow.git
cd taskflow-project
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd backend
npm install
# Create a .env file with: PORT, MONGO_URI, JWT_SECRET
npm start
\`\`\`

### 3. Setup Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`