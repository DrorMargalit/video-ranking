const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');


// Enable CORS
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Route for handling POST requests
app.post('/submit-feedback', async (req, res) => {
    const feedback = JSON.stringify(req.body);
    // Append feedback to the file with a newline character
    await fs.appendFile('responses.txt', feedback + '\n', (err) => {
        if (err) {
            console.error('Failed to save feedback:', err);
            res.status(500).send({ message: 'Failed to save feedback' });
        } else {
            res.status(200).send({ message: 'Feedback received and saved successfully!' });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
