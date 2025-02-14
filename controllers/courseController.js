const Course = require('../models/course');

const createCourse = async (req, res) => {
    const { title, instructor, duration, price } = req.body;
    try {
        const course = new Course({ title, instructor, duration, price });
        await course.save();
        res.status(201).json({course});
        console.log('Successfully create a course');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const enrollStudent = async (req, res) => {
    const { courseId, studentId } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.students.push(studentId);
        await course.save();
        res.json({ message: 'Student enrolled successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeStudent = async (req, res) => {
    const { _id } = req.body;

    try {
        // Find and delete the user by username
        const user = await Courseourse.findOneAndDelete({ _id });
        // Check if the user was found and deleted
        if (!user) {
            return res.status(404).json({ error: 'Student not found' });
        }
        // Return success message
        res.status(200).json({ message: 'Student removed successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Failed to remove student' });
    }
};

const updateStudent = async (req, res) => {
    const { _id,  title, instructor, duration, price } = req.body;
    const user = await Course.findByIdAndUpdate({_id, title, instructor, duration, price})
    try {
        if(!user){
            return res.status(404).json({error: 'Student not found'})
        }
        else{
            res.status(200).json({message: 'Student updated successfully'})
        }
    } catch (error) {
        console.log(error, 'Student could not be update')
    }
}



module.exports = { createCourse, enrollStudent, removeStudent, updateStudent };