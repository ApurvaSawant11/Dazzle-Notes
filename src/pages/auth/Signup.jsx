import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useDocumentTitle } from "../../hooks";

export const Signup = () => {
  useDocumentTitle("Signup");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const defaultFormValue = {
    email: "",
    password: "",
    confirmPwd: "",
    firstName: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(defaultFormValue);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const { email, password, confirmPwd } = formData;
    if (password === confirmPwd) {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fillFormValue = (event, fieldName) => {
    const regex = "^\\s+$";
    const { value } = event.target;
    if (!value.match(regex))
      setFormData((form) => ({ ...form, [fieldName]: value }));
  };

  return (
    <section className="auth-container">
      <form className="signup-form p-2p5 pt-0" onSubmit={signUpHandler}>
        <h4 className="text-center py-1">Sign Up</h4>
        <div className="flex-row form-name">
          <div className="input-field mb-2">
            <input
              className="input"
              type="text"
              value={formData.firstName}
              onChange={(e) => fillFormValue(e, "firstName")}
              required
            />
            <span className="bar"></span>
            <label className="placeholder">First Name</label>
          </div>
          <div className="input-field mb-2">
            <input
              className="input"
              type="text"
              value={formData.lastName}
              onChange={(e) => fillFormValue(e, "lastName")}
              required
            />
            <span className="bar"></span>
            <label className="placeholder">Last Name</label>
          </div>
        </div>

        <div className="input-field mb-2">
          <input
            className="input"
            type="email"
            onChange={(e) => fillFormValue(e, "email")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Enter Email</label>
        </div>
        <div className="input-field mb-2">
          <input
            className="input"
            type="password"
            onChange={(e) => fillFormValue(e, "password")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Password</label>
        </div>
        <div className="input-field mb-2">
          <input
            className="input"
            type="password"
            value={formData.confirmPwd}
            onChange={(e) => fillFormValue(e, "confirmPwd")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Confirm Password</label>
        </div>
        <p>
          <small>
            By continuing, you agree to Dazzle Cerashop's
            <span className="secondary-text fw-700">Terms of use</span> and
            <span className="secondary-text fw-700">Privacy Policy.</span>
          </small>
        </p>
        <button type="submit" className="button primary form-btn mt-0p5">
          Signup
        </button>

        <p className="text-center mt-1">
          Already have an account? Login{" "}
          <Link className="secondary-text fw-700" to="/login">
            here
          </Link>
        </p>
      </form>
    </section>
  );
};
