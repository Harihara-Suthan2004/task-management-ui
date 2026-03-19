import React from "react";
import axios from "axios";

const API_URL = "https://69a720a32cd1d055268ff452.mockapi.io/tm_project";

const DeleteUserModal = ({ user, closeModal, reloadUsers }) => {
const deleteUser = async () => {
  try {

    const res = await axios.get(API_URL);
    const projects = res.data;

    // find the project that contains the user
    const project = projects.find(p =>
      p.users?.some(u => String(u.id) === String(user.id))
    );

    if (!project) {
      console.log("User not found in any project");
      return;
    }

    const updatedUsers = project.users.filter(
      u => String(u.id) !== String(user.id)
    );

    await axios.put(`${API_URL}/${project.id}`, {
      ...project,
      users: updatedUsers
    });

    await reloadUsers();
    closeModal();

  } catch (error) {
    console.log("Delete error:", error);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-100 rounded-lg p-6 shadow-lg">

        <h2 className="text-lg font-semibold text-center mb-4">
          Delete User
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete <b>{user?.name}</b>?
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={deleteUser}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteUserModal;