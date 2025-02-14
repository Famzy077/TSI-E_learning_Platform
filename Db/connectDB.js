const mongoose = require('mongoose');
const connect = async() => {
    try {
        const Db = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to dataBase');
    } catch (error) {
        console.error(error, 'dataBase could not be connected')
    }
}
module.exports = connect 