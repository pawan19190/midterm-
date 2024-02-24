// Student's Name: Pawandeep Kaur
// Student's ID: 2005366482
// Date: 23 Feb 2024

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/routes.js');
const cors = require('cors');
const fs = require('fs');
const app = express();



app.use(cors({}))
app.use(express.json());    

dotenv.config({ path: './config.env' });

// Initialize MongoDB Connection
const InitiateMongoServer = require('./db');
InitiateMongoServer();
    

// Read the data from tasks.json
const data = JSON.parse(fs.readFileSync('./tasks.json', 'utf-8'));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        importData();
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Function to Import Data from Json file to MongoDB Cluster using Mongoose Model..
const importData = async () => {
    try {
        const Task = require('./src/model/task.js');
        // Check if the collection is empty
        const count = await Task.countDocuments().maxTimeMS(30000); 
        if (count === 0) {      
            await Task.create(data);
            console.log('Data successfully imported to MongoDB');
        } else {
            console.log('Data already exists in the database');
        }
    } catch (error) {
        console.log("Error importing the data", error);
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to my webpage!');
});

app.use('/tasks', taskRoutes);
app.use('/users', taskRoutes);
app.use('/tasks/status/:status', taskRoutes);
app.use('/task/:taskId', taskRoutes);
app.use('/user/:username', taskRoutes);

// For Listening on the Port Number in the localhost..
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});