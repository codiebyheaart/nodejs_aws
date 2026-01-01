// ============================================
// RESERVATIONS ROUTES
// Handle restaurant reservation operations
// ============================================

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// ============================================
// GET /api/reservations - Get all reservations
// ============================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM reservations ORDER BY reservation_date DESC, reservation_time DESC'
        );

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch reservations',
            message: error.message
        });
    }
});

// ============================================
// POST /api/reservations - Create new reservation
// ============================================
router.post('/', async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            customer_phone,
            party_size,
            reservation_date,
            reservation_time,
            special_requests
        } = req.body;

        // Validation
        if (!customer_name || !customer_email || !customer_phone || !party_size || !reservation_date || !reservation_time) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: customer_name, customer_email, customer_phone, party_size, reservation_date, and reservation_time are required'
            });
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customer_email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Party size validation
        if (party_size < 1 || party_size > 20) {
            return res.status(400).json({
                success: false,
                error: 'Party size must be between 1 and 20'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO reservations 
       (customer_name, customer_email, customer_phone, party_size, reservation_date, reservation_time, special_requests, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                customer_name,
                customer_email,
                customer_phone,
                party_size,
                reservation_date,
                reservation_time,
                special_requests || null,
                'pending'
            ]
        );

        // Fetch the created reservation
        const [newReservation] = await pool.query(
            'SELECT * FROM reservations WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: newReservation[0]
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create reservation',
            message: error.message
        });
    }
});

module.exports = router;
