console.log('Starting server...'); // Add this line at the top of your file

// Rest of your code...
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3004; 

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection pool
const db = mysql.createPool({
    connectionLimit: 10, // Limit the number of connections
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Va@311002', // Change this to your MySQL password
    database: 'UnitedInJoy'
});

// Handle connection errors
db.on('error', (err) => {
    console.error('MySQL error: ', err);
});

// Endpoint to add a video
app.post('/add-video', (req, res) => {
    const { service_id, video_url } = req.body;
    console.log('Received service_id:', service_id, 'and video_url:', video_url); // Debugging log

    // Validate input
    if (!service_id || !video_url) {
        return res.status(400).send('Service ID and Video URL are required.');
    }

    const sql = 'INSERT INTO videos (service_id, video_url) VALUES (?, ?)';
    
    db.query(sql, [service_id, video_url], (err, result) => {
        if (err) {
            console.error('Error inserting video:', err);
            return res.status(500).send('Error adding video: ' + err.message); // More specific error message
        }
        res.send('Video added successfully!');
    });
});

// Endpoint to get all videos
app.get('/videos', (req, res) => {
    const sql = 'SELECT * FROM videos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching videos:', err);
            return res.status(500).send('Error fetching videos: ' + err.message); // More specific error message
        }
        res.json(results);
    });
});

// Serve the videos HTML page
app.get('/videos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'videos.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
