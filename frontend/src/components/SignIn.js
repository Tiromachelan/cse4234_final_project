import React from "react";

export default function SignIn() {
  function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    alert("Sign-in is successful.");
  }

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* Username/Email Label and Input */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        
        {/* Password Label and Input */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
