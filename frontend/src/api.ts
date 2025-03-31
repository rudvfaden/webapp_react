import axios from 'axios';

// Determine the API URL based on the environment
const getApiUrl = () => {
    // Get current location information
    const currentUrl = window.location.hostname;
    const isProduction = currentUrl.includes('railway.app');
    
    if (isProduction) {
        // In production on Railway, API requests go to /api on the same domain
        return '/api';
    }
    
    // Default to localhost for development
    return 'http://localhost:8000';
};

const api = axios.create({
    baseURL: getApiUrl(),
});

export default api;
