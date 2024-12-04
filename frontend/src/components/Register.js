import React, { useState } from "react";
import "../style/Register.css";
import SignIn from "./SignIn.js";

export default function Register({ closeModal }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Function to open the Sign-In modal
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  // Function to close the Sign-In modal
  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registration is complete, please sign in.");
        } else {
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="inner-box">
      {/* Close button inside the inner box */}
      <button className="close-btn" onClick={closeModal}>
        ×
      </button>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Enter your first name"
          required
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Enter your last name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />

        <div className="center-content">
          <p>Already have an account?</p>
          <p>
            {/* Trigger the Sign-In modal */}
            <button
              type="button"
              className="sign-in-link"
              onClick={openSignInModal}
            >
              Sign In
            </button>
          </p>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Sign-In Modal */}
      {isSignInModalOpen && (
        <div className="modal-overlay" onClick={closeSignInModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeSignInModal}>
              ×
            </button>
            <SignIn />
          </div>
        </div>
      )}
    </div>
  );
}
