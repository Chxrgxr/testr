// App.js

import React, { useState } from 'react';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <h1>Search JSON Files</h1>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result.name}</li> {/* Adjust based on your JSON structure */}
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default App;
