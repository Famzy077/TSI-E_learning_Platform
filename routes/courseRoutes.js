const express = require('express');
const { createCourse, enrollStudent, removeStudent, updateStudent } = require('../controllers/courseController');

const router = express.Router();

router.post('/courses', createCourse);
router.post('/courses/enroll', enrollStudent);
router.post('/courses/remove', removeStudent);
router.post('/courses/update', updateStudent);

module.exports = router;