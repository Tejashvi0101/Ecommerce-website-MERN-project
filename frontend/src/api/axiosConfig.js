import axios from 'axios';

// Set base URL from environment variable or fallback to empty string
axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';

export default axios;
