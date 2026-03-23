import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterModal = ({ open, onClose }) => {
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
    onClose();
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password required";
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registered Successfully ✅");

      handleClose();
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

        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
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
          className="w-full border p-2 rounded mb-4"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
