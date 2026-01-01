# 🚀 Quick Setup Guide for Restaurant Backend

## Prerequisites Check

Before running the application, ensure you have:

- ✅ **Node.js** installed (check: `node --version`)
- ⚠️ **MySQL** needs to be installed

## MySQL Installation (Windows)

### Option 1: Download MySQL Installer
1. Download from: https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set root password during installation (or leave empty for local dev)
4. Complete the installation

### Option 2: Use XAMPP (Easier for beginners)
1. Download XAMPP: https://www.apachefriends.org/
2. Install XAMPP (includes MySQL)
3. Start MySQL from XAMPP Control Panel

## Database Setup

### Step 1: Start MySQL
- If using XAMPP: Open XAMPP Control Panel and click "Start" for MySQL
- If using standalone MySQL: MySQL should start automatically

### Step 2: Create Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
# Enter your MySQL password (or just press Enter if no password)
```

Then run:
```sql
source schema.sql
exit
```

**Option B: Using phpMyAdmin (with XAMPP)**
1. Go to http://localhost/phpmyadmin
2. Click "Import" tab
3. Choose `schema.sql` file
4. Click "Go"

**Option C: Create manually in MySQL Workbench**
1. Open MySQL Workbench
2. Open `schema.sql` file
3. Execute the script

### Step 3: Update .env file

Edit `.env` and set your MySQL password:
```env
DB_PASSWORD=your_password_here
```

If you have no password (local development), leave it empty:
```env
DB_PASSWORD=
```

## Running the Application

```bash
# Development mode (auto-restart on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
============================================
🍽️  RESTAURANT BACKEND API
============================================
✅ Server running on port 3000
📍 Local: http://localhost:3000
🏥 Health check: http://localhost:3000/health
============================================
```

## Testing the APIs

Open your browser or use curl:

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test menu endpoint
curl http://localhost:3000/api/menu

# Test creating a menu item
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -d "{\"name\":\"New Dish\",\"description\":\"Delicious food\",\"price\":15.99,\"category\":\"Main Course\"}"
```

## Common Issues & Solutions

### Issue 1: "MySQL command not found"
**Solution:** MySQL is not installed. Follow the MySQL installation steps above.

### Issue 2: "Access denied for user 'root'@'localhost'"
**Solution:** Update the password in `.env` file to match your MySQL root password.

### Issue 3: "Database 'restaurant_db' does not exist"
**Solution:** Run the `schema.sql` file to create the database and tables.

### Issue 4: Port 3000 already in use
**Solution:** Change the PORT in `.env` file:
```env
PORT=3001
```

## Next Steps for AWS Deployment

Once the application runs locally:

1. ✅ Test all API endpoints
2. ✅ Commit to GitHub
3. 🚀 Deploy to AWS EC2 or Elastic Beanstalk
4. 🗄️ Use AWS RDS for production MySQL database

---

**Need Help?** Check the main README.md for detailed API documentation.
