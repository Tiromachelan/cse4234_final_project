import React from "react";

export default function Register() {
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
    });

    alert("Registration is complete.");
  }

  return (
    <div className="sign-in-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" />
        <input name="last_name" />
        <input name="email" />
        <input name="password"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}