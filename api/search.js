// api/search.js

const fs = require('fs');
const path = require('path');

// Function to read JSON files in a directory
const readJsonFiles = (dir) => {
    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const filePath = path.join(dir, file);
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        });
};

module.exports = async (req, res) => {
    const { q } = req.query; // Get search query from request parameter

    // Directory where your JSON files are stored (adjust as needed)
    const jsonDir = path.join(__dirname, '../data'); // Assuming JSON files are in 'data' directory

    try {
        // Read all JSON files from directory
        const jsonFiles = readJsonFiles(jsonDir);

        // Perform search based on aliases
        const results = jsonFiles.filter(file => {
            // Adjust the logic based on your JSON structure and search criteria
            return file.aliases.includes(q.toLowerCase());
        });

        // Return results as JSON
        res.status(200).json({ results });
    } catch (error) {
        console.error('Error searching JSON files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
