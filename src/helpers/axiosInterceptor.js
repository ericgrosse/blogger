import axios from 'axios';
import toastr from 'toastr';

// Function to handle JWT token expiration
const handleTokenExpiration = () => {
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  
  // Redirect to homepage
  // TODO

  // Show toastr notification
  toastr.warning('Your session has expired. Please log in again.');
};

// Add response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

export default axios;
