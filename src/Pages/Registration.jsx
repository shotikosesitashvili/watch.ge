import React from "react";
import { useForm } from "react-hook-form";
import "../App.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("ფორმის მონაცემები: ", data);
  }

  return (
    <div className="register-page-container page-padding-top">
      <div className="register-card">
        <h2>Create Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={errors.email ? "input-error-border" : ""}
              {...register("email", {
                required: "Email ველი არის ცარიელი",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email არასწორია",
                },
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={errors.password ? "input-error-border" : ""}
              {...register("password", {
                required: "Password აუცილებელია",
                minLength: {
                  value: 8,
                  message: "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო",
                },
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="register-submit-btn">
            Register
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Register;