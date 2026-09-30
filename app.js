const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary student data
let students = [
    {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        course: 'Computer Engineering'
    },
    {
        id: 2,
        name: 'Priya Patil',
        email: 'priya@example.com',
        course: 'Information Technology'
    }
];

// Get all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// Add a student
app.post('/api/students', (req, res) => {

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const student = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        email,
        course
    };

    students.push(student);

    res.status(201).json(student);
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const studentExists = students.some(student => student.id === id);

    if (!studentExists) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    students = students.filter(student => student.id !== id);

    res.json({
        message: 'Student deleted successfully'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Student Management System running at http://localhost:${PORT}`);
});

module.exports = app;
