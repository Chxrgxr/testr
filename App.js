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
            setSearchResults(data.result.scripts); // Assuming 'scripts' contains the array of results
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <h1>Search Results</h1>
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
                        {searchResults.map((script, index) => (
                            <li key={index}>
                                <h2>{script.title}</h2>
                                <p>Game Name: {script.game.name}</p>
                                <p>Views: {script.views}</p>
                                {/* Add more details as needed */}
                                <p>Script: {script.script}</p>
                            </li>
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
