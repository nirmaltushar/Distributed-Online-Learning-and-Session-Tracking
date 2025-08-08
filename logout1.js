function clearSession() {
    localStorage.removeItem('userSession');
    sessionStorage.clear();
  
    // Optional: Notify backend (if you have one)
    fetch('https://your-backend.com/api/logout', {
      method: 'POST',
      credentials: 'include'
    }).catch(err => console.error('Logout failed:', err));
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    clearSession();
  
    document.getElementById('loginBtn').addEventListener('click', function() {
      window.location.href = 'login.html'; // Replace with your login page
    });
  });
  