// ============================================
// RESTAURANT BACKEND
// Node.js + Express + MySQL
// Simple Restaurant Management System
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');

// Import routes
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow all origins for development
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Restaurant Backend API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ============================================
// API ROUTES
// ============================================

app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

// ============================================
// ROOT ENDPOINT
// ============================================

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Restaurant Management API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            menu: {
                getAll: 'GET /api/menu',
                getById: 'GET /api/menu/:id',
                create: 'POST /api/menu'
            },
            reservations: {
                getAll: 'GET /api/reservations',
                create: 'POST /api/reservations'
            }
        }
    });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your configuration.');
            process.exit(1);
        }

        // Start Express server
        app.listen(PORT, () => {
            console.log('============================================');
            console.log('🍽️  RESTAURANT BACKEND API');
            console.log('============================================');
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📍 Local: http://localhost:${PORT}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log(`📚 API docs: http://localhost:${PORT}/`);
            console.log('============================================');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

// Start the server
startServer();
