const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies (with base64 images)
app.use(express.json({ limit: '10mb' })); // Increase limit if needed

// POST endpoint to receive base64 avatar image and save it as JPG
app.post('/upload-avatar', (req, res) => {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            return res.status(400).json({ error: 'No avatar data provided' });
        }

        // Remove the data URL prefix if present (e.g. "data:image/jpeg;base64,")
        const base64Data = avatar.replace(/^data:image\/jpeg;base64,/, '')
                                 .replace(/^data:image\/jpg;base64,/, '')
                                 .replace(/^data:image\/png;base64,/, ''); // allow png fallback

        // Create a buffer from the base64 string
        const imgBuffer = Buffer.from(base64Data, 'base64');

        // Define a file path to save the avatar
        const fileName = 'avatar.jpg';
        const filePath = path.join(__dirname, fileName);

        // Synchronously write the buffer to a file
        fs.writeFileSync(filePath, imgBuffer);

        console.log('Image saved successfully:', filePath);
        return res.json({ message: 'Image uploaded and saved successfully', filePath });
    } catch (error) {
        console.error('Failed to save image:', error);
        return res.status(500).json({ error: 'Failed to save image' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
