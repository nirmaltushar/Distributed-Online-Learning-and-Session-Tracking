// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
  // Clear session storage to simulate logout
  sessionStorage.removeItem("emailS");
  sessionStorage.removeItem("passwordS");

  // Prevent the user from navigating back to the dashboard after logout
  window.onpageshow = function (event) {
      if (event.persisted) {
          window.location.reload(); // Reload page to ensure logout state
      }
  };

  history.pushState(null, null, location.href); // Disable back navigation
  window.onpopstate = function () {
      history.go(1); // Force forward navigation
  };

  // Redirect to login page (update URL if necessary)
  window.location.href = 'A_S.html';
});
