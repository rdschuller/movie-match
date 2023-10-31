import React from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
    // Extract userId from route params
    const { userId } = useParams();

    return (
        <div>
            <h1>User Page</h1>
            {/* Display User data based on userId */}
            <p>User ID: {userId}</p>
        </div>
    );
}

export default UserPage;