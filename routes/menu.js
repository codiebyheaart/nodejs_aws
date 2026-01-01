// ============================================
// MENU ROUTES
// Handle menu item operations
// ============================================

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// ============================================
// GET /api/menu - Get all menu items
// ============================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM menu ORDER BY category, name'
        );

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch menu items',
            message: error.message
        });
    }
});

// ============================================
// GET /api/menu/:id - Get specific menu item
// ============================================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM menu WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch menu item',
            message: error.message
        });
    }
});

// ============================================
// POST /api/menu - Create new menu item
// ============================================
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, image_url, is_available } = req.body;

        // Validation
        if (!name || !price || !category) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, price, and category are required'
            });
        }

        const [result] = await pool.query(
            'INSERT INTO menu (name, description, price, category, image_url, is_available) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description || null, price, category, image_url || null, is_available !== undefined ? is_available : true]
        );

        // Fetch the created item
        const [newItem] = await pool.query(
            'SELECT * FROM menu WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: newItem[0]
        });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create menu item',
            message: error.message
        });
    }
});

module.exports = router;
