import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../Services/UserService";

const AddUserModal = ({ closeModal, reloadUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  //loading state can't doublr click
  const [isSubbmiting, setIsSubnmitting] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page from refreshing

    setErrors({});
    let newErrors = {};

    //field validation logic
    if(!name.trim()){
      newErrors.name = "Name is Required"

    }
    if(!email.trim()){
      newErrors.email = "Email is Required"
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      newErrors.email = "Please enter a valid email"
    }
if(Object.keys(newErrors).length>0){
  setErrors(newErrors);
  return;
}

    setIsSubnmitting(true);
    try {
      //send data to backend
      await createUser({name, email, role});
      toast.success("User created! Invitation email sent.");

      //fetch new data from postgress
      if (reloadUsers) {
        reloadUsers();
      }
      closeModal();
    } catch (error) {
      //show backend error
      toast.error(error.response?.data?.message || "Failed to create user.");
    } finally {
      setIsSubnmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex mt-20 items-center justify-center">
      <div className="bg-white w-105 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New User</h2>

          <button onClick={closeModal}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter name"
              value={name}
              onChange={(e)=>{setName(e.target.value);
                if(errors.name)setErrors({...errors, name: null});
              }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
                if(errors.email)setErrors({...errors,email: null})
              }}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="text-sm font-medium">Role</label>

            <select
              className="w-full border rounded p-2 mt-1"
              value={role}
              onChange={(e)=>
                setRole(e.target.value)
              }
            >
              <option value="USER">User</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button onClick={closeModal} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubbmiting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 transition"
            >
              {isSubbmiting ? "Sending..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
