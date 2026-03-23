import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Profile = () => {

  const [name, setName] = useState("Test Admin")
  const [email, setEmail] = useState("admin123@gmail.com")

  return (
    <div className="flex flex-col gap-5">
      <div>
        <PageTitle />
      </div>
      

      <div className="bg-white shadow-md rounded-lg p-6 w-full mb-4">

        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your account's profile information and email address.
        </p>

        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}  // ✅ fix
              className="w-2xl border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-gray-400  px-3 py-2 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // ✅ fix
              className="w-2xl border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-gray-400  px-3 py-2 mt-1"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              value="admin"
              disabled
              className="w-2xl border border-gray-200 rounded-md px-3 py-2 mt-1 bg-gray-100"
            />
            <p className="text-xs text-gray-400 mt-1">
              Role is disabled - you can't edit the role
            </p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-3">
            SAVE
          </button>

        </div>

      </div>
    </div>
  )
}

export default Profile