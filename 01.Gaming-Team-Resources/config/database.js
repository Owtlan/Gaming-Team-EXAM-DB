const mongoose = require('mongoose')

const dbName = 'gaming-team'
const connectionString = `mongodb://127.0.0.1:27017/${dbName}`;

module.exports = async (app) => {


    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database Error');
            console.error(err);
        })

    } catch (err) {
        console.error('Error connecting to databse');
        process.exit(1);
    }

}