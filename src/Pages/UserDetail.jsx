import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://69a92ef932e2d46caf457735.mockapi.io/users";

const UserDetail = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadUser = async () => {
      const res = await axios.get(`${API_URL}/${id}`);
      setUser(res.data);
    };

    loadUser();

  }, [id]);

  if (!user) {
    return <div className="p-10">Loading...</div>;
  }

  return (

    <div className="bg-[#ebe8e8] min-h-screen p-10">

      {/* USER HEADER */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">

        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {user.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

          <div className="flex gap-3 mt-2">

            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
              {user.role.toUpperCase()}
            </span>

            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              Created by: Test Admin
            </span>

          </div>

        </div>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-5 gap-6 mt-6">

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-xl text-center shadow">
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

        <h3 className="font-semibold mb-4">
          User Information
        </h3>

        <div className="grid grid-cols-3 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Member Since</p>
            <p>25 February 2026</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Account Status</p>
            <p className="text-green-600 font-medium">Verified</p>
          </div>

        </div>

      </div>

      {/* ACTIVITY LOG */}
      <div className="bg-white rounded-xl shadow mt-6 p-6">

        <h3 className="font-semibold mb-4">
          Activity Log
        </h3>

        <div className="bg-gray-100 p-3 rounded text-sm flex justify-between">

          <span>
            Task 'home page' was created and assigned to {user.name}
          </span>

          <span className="text-gray-500">
            02/03/2026 12:27 pm
          </span>

        </div>

      </div>

    </div>

  );
};

export default UserDetail;