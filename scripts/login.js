// script.js

document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(event) {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validate form fields
      if (!email || !password) {
          event.preventDefault(); // Prevent form submission
          alert("Please fill in both email and password."); // Alert message
      } else {
          // Optional: Add more complex validation logic here
          // For example, you might want to check the email format
      }
  });
});

// Function to handle Google Sign-In
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // You can send the ID token to your backend server here for verification
}

// Function to sign out
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}
