import React, { useState } from 'react';

function App() {
    const [responseData, setResponseData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/q?q=test');
            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Hello Vercel and React!</h1>
            <button onClick={fetchData}>Fetch Data</button>
            {responseData && (
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
            )}
        </div>
    );
}

export default App;
