import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "https://69a720a32cd1d055268ff452.mockapi.io/tm_project";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showRoleMenu, setShowRoleMenu]   = useState(false);

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
  {/* KEEP EVERYTHING INSIDE THIS BOX */}
  <div className="bg-white rounded-xl shadow mt-6 p-6">
  <h3 className="font-semibold mb-4">User Information</h3>

  <div className="grid grid-cols-3 gap-8 items-center">

    {/* Email */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M64 160C64 124.7 92.7 96 128 96L512 96C547.3 96 576 124.7 576 160L576 480C576 515.3 547.3 544 512 544L128 544C92.7 544 64 515.3 64 480L64 160zM128 144C119.2 144 112 151.2 112 160L112 199.1L300.8 335.2C312.1 343.3 327.9 343.3 339.2 335.2L528 199.1L528 160C528 151.2 520.8 144 512 144L128 144zM528 260.9L366.4 375.6C338.2 395.5 301.8 395.5 273.6 375.6L112 260.9L112 480C112 488.8 119.2 496 128 496L512 496C520.8 496 528 488.8 528 480L528 260.9z"/>
        </svg>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Email</p>
        <p className="font-medium">{user.email}</p>
      </div>
    </div>

    {/* Member Since */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/>
        </svg>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Member Since</p>
        <p className="font-medium">25 February 2026</p>
      </div>
    </div>

    {/* Status */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
        </svg>
      </div>
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
