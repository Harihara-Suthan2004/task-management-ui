import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialForm = {
  email: "",
  password: "",
};

const LoginModal = ({ open, onClose,onSuccess }) => {
  const [forgotMode, setForgotMode] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    setForgotMode(false);
    onClose();
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!forgotMode && !form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (forgotMode) {
        toast.info("OTP Submitted");
        handleClose();
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/users/login",
            {
              email: form.email,
              password: form.password,
            },
          );

          const data = response.data;
          toast.success("Login successful!");

          localStorage.setItem("token", data.token);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }

          onSuccess();
          handleClose();
        } catch (error) {
        
          if (error.response) {
           
            setErrors({
              general: error.response.data.message || "Invalid credentials",
            });
          } else {
            
            setErrors({ general: "Cannot connect to server" });
          }
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-105 p-8 rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-500"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {forgotMode ? "Reset Password" : "Sign In"}
        </h2>

        {!forgotMode ? (
          <>
            {errors.general && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center text-sm">
                {errors.general}
              </div>
            )}
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mb-2">{errors.email}</p>
            )}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <button
                onClick={() => setForgotMode(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-2 rounded mb-3"
            />

            {/* OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Back to Login */}
            <div className="text-left mb-4">
              <button
                onClick={() => setForgotMode(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {forgotMode ? "Submit OTP" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
