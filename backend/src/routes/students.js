const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Validation middleware
const validateStudent = (req, res, next) => {
  const { name, dateofbirth, email } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2 || name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (!dateofbirth) {
    errors.push('Date of birth is required');
  } else {
    const dob = new Date(dateofbirth);
    const today = new Date();
    if (dob >= today) {
      errors.push('Date of birth must be in the past');
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// GET all students
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, dateofbirth, email, created_at FROM students ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// GET single student
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, dateofbirth, email, created_at FROM students WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// POST create student
router.post('/', validateStudent, async (req, res) => {
  try {
    const { name, dateofbirth, email } = req.body;
    
    const result = await pool.query(
      'INSERT INTO students (name, dateofbirth, email) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), dateofbirth, email.trim().toLowerCase()]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// PUT update student
router.put('/:id', validateStudent, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dateofbirth, email } = req.body;
    
    const result = await pool.query(
      'UPDATE students SET name = $1, dateofbirth = $2, email = $3 WHERE id = $4 RETURNING *',
      [name.trim(), dateofbirth, email.trim().toLowerCase(), id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM students WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
