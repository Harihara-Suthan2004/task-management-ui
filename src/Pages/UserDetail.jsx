import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCalendar, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://69a720a32cd1d055268ff452.mockapi.io/tm_project";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get(API_URL);
      const projects = res.data;

      const allUsers = projects.flatMap((p) => p.users || []);
      const foundUser = allUsers.find((u) => String(u.id) === String(id));

      setUser(foundUser);
    };

    loadUser();
  }, [id]);

  const updateRole = async (newRole) => {
    // 1️⃣ instant UI change
    setUser((prev) => ({
      ...prev,
      role: newRole,
    }));

    // 2️⃣ close dropdown immediately
    setShowRoleMenu(false);

    try {
      const res = await axios.get(API_URL);
      const projects = res.data;

      for (let project of projects) {
        if (!project.users) continue;

        let updated = false;

        const updatedUsers = project.users.map((u) => {
          if (String(u.id) === String(id)) {
            updated = true;
            return { ...u, role: newRole };
          }

          return u;
        });

        if (updated) {
          await axios.put(`${API_URL}/${project.id}`, {
            ...project,
            users: updatedUsers,
          });
        }
      }
    } catch (error) {
      console.log("Role update error:", error);
    }
  };

  if (!user) {
    return <div className="p-10">Loading...</div>;
  }

  return (
   <div className="bg-[#ebe8e8] min-h-screen">

  {/* BACK BUTTON */}
  <div className="px-4 -mt-6 my-2">
    <button
      onClick={() => navigate(-1)}
      className="w-10 h-8 flex items-center justify-center rounded-md bg-gray-500 text-white hover:bg-gray-800"
    >
      ←
    </button>
  </div>
      {/* USER HEADER */}

      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {user.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>

          <p className="text-gray-500">{user.email}</p>

          <div className="flex gap-3 mt-2">
            {/* ROLE DROPDOWN */}

            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`px-4 py-1 rounded-full text-xs text-white
  ${user.role?.toLowerCase() === "manager" ? "bg-blue-500" : "bg-green-500"}`}
              >
                {user.role.toUpperCase()}
              </button>

              {showRoleMenu && (
                <div className="absolute top-9 bg-white border rounded-lg shadow-md w-32 overflow-hidden">
                  <div
                    onClick={() => updateRole("manager")}
                    className="flex items-center justify-between bg-blue-100 px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  >
                    <span className="text-blue-600  font-medium">Manager</span>

                    {user.role === "manager" && (
                      <span className="text-blue-600 ml-2">✓</span>
                    )}
                  </div>

                  <div
                    onClick={() => updateRole("user")}
                    className="flex items-center justify-between bg-green-100 px-4 py-2 hover:bg-green-200 cursor-pointer"
                  >
                    <span className="text-green-600 font-medium">User</span>

                    {user.role === "user" && (
                      <span className="text-green-600 ml-2">✓</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              Created by : Test Admin
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-5 gap-6 mt-6">
        <div className="bg-linear-to-r from-purple-500 to-purple-700 text-white p-4 rounded-xl text-center shadow">
          <p className="text-xl font-bold">2</p>
          <p className="text-sm">Projects</p>
        </div>

        <div className="bg-gray-600 text-white p-4 rounded-xl text-center shadow">
          <p className="text-xl font-bold">1</p>
          <p className="text-sm">To Do</p>
        </div>

        <div className="bg-blue-500 text-white p-4 rounded-xl text-center shadow">
          <p className="text-xl font-bold">0</p>
          <p className="text-sm">In Progress</p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl text-center shadow">
          <p className="text-xl font-bold">1</p>
          <p className="text-sm">Completed</p>
        </div>

        <div className="bg-orange-500 text-white p-4 rounded-xl text-center shadow">
          <p className="text-xl font-bold">2</p>
          <p className="text-sm">Assigned Tasks</p>
        </div>
      </div>

      {/* USER INFO */}

<div className="bg-white rounded-xl shadow mt-6 p-6">
  <h3 className="font-semibold mb-4">User Information</h3>

  {/* KEEP EVERYTHING INSIDE THIS BOX */}
  <div className="grid grid-cols-3 gap-6">

    {/* Email */}
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-lg" />
      <div>
        <p className="text-gray-500 text-sm">Email</p>
        <p>{user.email}</p>
      </div>
    </div>

    {/* Member Since */}
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-400 text-lg" />
      <div>
        <p className="text-gray-500 text-sm">Member Since</p>
        <p>25 February 2026</p>
      </div>
    </div>

    {/* Status */}
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-lg" />
      <div>
        <p className="text-gray-500 text-sm">Account Status</p>
        <p className="text-green-600 font-medium">Verified</p>
      </div>
    </div>

  </div>
</div>

      {/* ACTIVITY LOG */}

      <div className="bg-white rounded-xl shadow mt-6 p-6">
        <h3 className="font-semibold mb-4">Activity Log</h3>

        <div className="bg-gray-100 p-3 rounded text-sm flex justify-between">
          <span>Task 'home page' was created and assigned to {user.name}</span>

          <span className="text-gray-500">02/03/2026 12:27 pm</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
