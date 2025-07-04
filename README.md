# Palette Picker

A full-stack web application for creating, storing, and sharing color palettes. Built with React, Express.js, and PostgreSQL, this application demonstrates modern web development practices and provides a foundation for learning full-stack development.

## 🎨 Features //not included in main draft!

- **User Authentication**: Secure login system with username/password
- **Palette Creation**: Create custom color palettes with 3 colors
- **Palette Management**: View, organize, and manage your color collections
- **Temperature Classification**: Categorize palettes as warm, cool, or neutral
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live reload during development

## 🏗️ Project Structure

```
palettePickerReact/
├── app/                    # React frontend application
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Application styles
│   │   └── main.jsx       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container configuration
├── server/                 # Express.js backend application
│   ├── controllers/       # Route handlers
│   ├── models/           # Data models
│   ├── middleware/       # Express middleware
│   ├── db/              # Database migrations and seeds
│   ├── index.js         # Server entry point
│   ├── knexfile.js      # Database configuration
│   └── package.json     # Backend dependencies
├── docker-compose.yml    # Multi-container setup
└── README.md            # This file
```

## 🛠️ Technologies Used

### Frontend

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with modern features

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Knex.js** - SQL query builder
- **PostgreSQL** - Relational database
- **bcrypt** - Password hashing

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

### For Docker Setup

- Docker Desktop installed and running
- Git

### For Local Setup

- Node.js (v18 or higher)
- PostgreSQL (v16 or higher)
- npm or yarn package manager

## 🚀 Quick Start with Docker (Recommended)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd palettePickerReact
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=palette_picker

# Server Configuration
PORT=8080
```

Create a `.env` file in the `server/` directory:

```bash
# Database Connection
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=palette_picker

# Server Configuration
PORT=8080
```

### 3. Start the Application

```bash
docker-compose up --build
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080 //use this in main draft
- **Database**: localhost:5432

### 5. Stop the Application

```bash
docker-compose down
```

## 🔧 Local Development Setup

### 1. Clone and Navigate

```bash
git clone <your-repository-url>
cd palettePickerReact
```

### 2. Set Up PostgreSQL Database

#### Option A: Using PostgreSQL directly

1. Install PostgreSQL on your system
2. Create a new database:

```sql
CREATE DATABASE palette_picker;
CREATE USER palette_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE palette_picker TO palette_user;
```

#### Option B: Using Docker for database only

```bash
docker run --name palette-db \
  -e POSTGRES_DB=palette_picker \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:16
```

### 3. Configure Environment Variables

Create `.env` file in the `server/` directory:

```bash
# Database Connection (Local PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=palette_picker

# Server Configuration
PORT=8080
```

### 4. Set Up Backend

```bash
cd server
npm install
npm run migrate
npm run seed
npm run dev
```

### 5. Set Up Frontend

```bash
cd app
npm install
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080

## 🗄️ Database Setup

### Environment Variables Explained

| Variable            | Description                  | Example                      |
| ------------------- | ---------------------------- | ---------------------------- |
| `DB_HOST`           | Database host address        | `localhost` or `db` (Docker) |
| `DB_PORT`           | Database port                | `5432`                       |
| `DB_USER`           | Database username            | `postgres`                   |
| `DB_PASSWORD`       | Database password            | `your_secure_password`       |
| `DB_NAME`           | Database name                | `palette_picker`             |
| `POSTGRES_USER`     | PostgreSQL user (Docker)     | `postgres`                   |
| `POSTGRES_PASSWORD` | PostgreSQL password (Docker) | `your_secure_password`       |
| `POSTGRES_DB`       | PostgreSQL database (Docker) | `palette_picker`             |

### Database Commands

```bash
# Run migrations
npm run migrate

# Run seeds
npm run seed

# Reset database (rollback + migrate + seed)
npm run reset

# Rollback migrations
npm run rollback
```

## 🔌 API Endpoints

### Authentication

- `POST /api/login` - User login

### Palettes

- `GET /api/palettes` - Get all palettes
- `GET /api/users/:id/palettes` - Get user's palettes
- `POST /api/users/:id/palettes/create` - Create new palette

### Example API Usage

```javascript
// Login
const loginResponse = await fetch("http://localhost:8080/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "user", password: "pass" }),
});

// Get all palettes
const palettes = await fetch("http://localhost:8080/api/palettes");

// Create palette
const newPalette = await fetch(
  `http://localhost:8080/api/users/${userId}/palettes/create`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "My Palette",
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      temperature: "warm",
    }),
  }
);
```

## 🎯 Frontend Features

- **Responsive Design**: Mobile-first approach
- **Color Picker**: Interactive color selection
- **Palette Management**: Create, view, and organize palettes
- **User Interface**: Clean, modern design with smooth animations
- **Real-time Updates**: Live reload during development

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Check what's using the port
   lsof -i :8080
   # Kill the process
   kill -9 <PID>
   ```

2. **Database Connection Failed**

   - Verify PostgreSQL is running
   - Check environment variables
   - Ensure database exists

3. **Docker Issues**

   ```bash
   # Clean up containers
   docker-compose down -v
   # Rebuild images
   docker-compose up --build
   ```

4. **Node Modules Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for frontend errors
- Monitor server logs for backend issues
- Use database tools like pgAdmin for database inspection

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy Coding! 🎨✨**
