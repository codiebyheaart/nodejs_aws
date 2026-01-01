# Restaurant Management Backend API

A simple and clean Node.js backend application for restaurant management, designed for learning AWS deployment. This project provides RESTful APIs for managing menu items and reservations.

## 🚀 Features

- **Menu Management**: Create and retrieve menu items
- **Reservation System**: Manage customer reservations
- **MySQL Database**: Persistent data storage
- **RESTful APIs**: Clean and simple API design
- **Error Handling**: Comprehensive error responses
- **CORS Enabled**: Ready for frontend integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

## 🛠️ Installation

### 1. Clone the Repository

```bash
cd backend_new
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_db
DB_PORT=3306
NODE_ENV=development
```

### 4. Set Up Database

Log in to MySQL:

```bash
mysql -u root -p
```

Run the schema file:

```bash
source schema.sql
```

Or alternatively, run it directly:

```bash
mysql -u root -p < schema.sql
```

This will:
- Create the `restaurant_db` database
- Create `menu` and `reservations` tables
- Insert sample data for testing

## 🏃 Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Restaurant Backend API is running",
  "timestamp": "2025-12-31T11:08:50.000Z",
  "uptime": 123.45
}
```

---

### Menu Endpoints

#### 1. Get All Menu Items

```http
GET /api/menu
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "description": "Classic pizza with tomato sauce...",
      "price": 12.99,
      "category": "Main Course",
      "image_url": null,
      "is_available": true,
      "created_at": "2025-12-31T10:00:00.000Z",
      "updated_at": "2025-12-31T10:00:00.000Z"
    }
  ]
}
```

#### 2. Get Menu Item by ID

```http
GET /api/menu/:id
```

**Example:** `GET /api/menu/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce...",
    "price": 12.99,
    "category": "Main Course",
    "image_url": null,
    "is_available": true
  }
}
```

#### 3. Create Menu Item

```http
POST /api/menu
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Pasta Carbonara",
  "description": "Creamy pasta with bacon and parmesan",
  "price": 14.99,
  "category": "Main Course",
  "is_available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item created successfully",
  "data": {
    "id": 6,
    "name": "Pasta Carbonara",
    "description": "Creamy pasta with bacon and parmesan",
    "price": 14.99,
    "category": "Main Course",
    "is_available": true
  }
}
```

---

### Reservation Endpoints

#### 1. Get All Reservations

```http
GET /api/reservations
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "customer_email": "john.doe@example.com",
      "customer_phone": "+1234567890",
      "party_size": 4,
      "reservation_date": "2025-01-15",
      "reservation_time": "19:00:00",
      "special_requests": "Window seat preferred",
      "status": "confirmed",
      "created_at": "2025-12-31T10:00:00.000Z"
    }
  ]
}
```

#### 2. Create Reservation

```http
POST /api/reservations
Content-Type: application/json
```

**Request Body:**
```json
{
  "customer_name": "Jane Smith",
  "customer_email": "jane.smith@example.com",
  "customer_phone": "+1987654321",
  "party_size": 2,
  "reservation_date": "2025-01-20",
  "reservation_time": "18:30:00",
  "special_requests": "Anniversary dinner"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reservation created successfully",
  "data": {
    "id": 2,
    "customer_name": "Jane Smith",
    "customer_email": "jane.smith@example.com",
    "customer_phone": "+1987654321",
    "party_size": 2,
    "reservation_date": "2025-01-20",
    "reservation_time": "18:30:00",
    "special_requests": "Anniversary dinner",
    "status": "pending"
  }
}
```

---

## 🧪 Testing the APIs

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# Get all menu items
curl http://localhost:3000/api/menu

# Get specific menu item
curl http://localhost:3000/api/menu/1

# Create menu item
curl -X POST http://localhost:3000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tiramisu",
    "description": "Italian coffee-flavored dessert",
    "price": 6.99,
    "category": "Dessert"
  }'

# Get all reservations
curl http://localhost:3000/api/reservations

# Create reservation
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Alice Johnson",
    "customer_email": "alice@example.com",
    "customer_phone": "+1122334455",
    "party_size": 3,
    "reservation_date": "2025-01-25",
    "reservation_time": "20:00:00"
  }'
```

### Using Postman

1. Import the API endpoints listed above
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with sample data

## 🐳 AWS Deployment Notes

This application is designed to be deployed on AWS. Here are some deployment options:

### Option 1: AWS EC2
1. Launch an EC2 instance (Ubuntu recommended)
2. Install Node.js and MySQL
3. Clone the repository
4. Configure environment variables
5. Run the application with PM2

### Option 2: AWS Elastic Beanstalk
1. Create an Elastic Beanstalk environment for Node.js
2. Set up RDS for MySQL database
3. Configure environment variables in EB console
4. Deploy using EB CLI or ZIP upload

### Option 3: AWS ECS (Docker)
1. Create a Dockerfile for the application
2. Push to Amazon ECR
3. Configure ECS service with RDS

## 📁 Project Structure

```
backend_new/
├── config/
│   └── database.js          # MySQL connection configuration
├── routes/
│   ├── menu.js              # Menu API routes
│   └── reservations.js      # Reservation API routes
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── schema.sql               # Database schema
├── server.js                # Main application file
└── README.md                # This file
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | restaurant_db |
| `DB_PORT` | MySQL port | 3306 |
| `NODE_ENV` | Environment | development |

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as needed!

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🎯 Purpose

This project is created for learning AWS deployment strategies. It provides a simple, clean codebase that's easy to deploy and test on AWS infrastructure.

---

**Happy Coding! 🚀**
