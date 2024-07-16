// api/q.js
module.exports = async (req, res) => {
    const { query } = req.query; // Capture the value after ?q=

    // Process 'query' as needed
    const response = {
        message: 'Received your request',
        query: query
    };

    // Respond with JSON
    res.status(200).json(response);
};
