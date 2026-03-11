import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://69a92ef932e2d46caf457735.mockapi.io/users";

const AddUserModal = ({ closeModal, reloadUsers }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const createUser = async () => {

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(API_URL, {
      name,
      email,
      role
    });

    reloadUsers();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex mt-20 items-center justify-center">

      <div className="bg-white w-105 rounded-lg shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold">
            Add New User
          </h2>

          <button onClick={closeModal}>
            ✕
          </button>

        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="text-sm font-medium">
            Role
          </label>

          <select
            className="w-full border rounded p-2 mt-1"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={closeModal}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={createUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create User
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddUserModal;