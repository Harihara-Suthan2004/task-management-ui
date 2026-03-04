import { useState, useRef } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../Components/RegisterModal";


const Welcome = () => {
  const rolesRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
const [showRegister, setShowRegister] = useState(false);
 

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-slate-50 via-blue-50 to-slate-100">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded">
            TF
          </div>
          <h1 className="text-lg font-semibold text-gray-900">TaskFlow</h1>
        </div>

        <div className="flex items-center gap-6">
          <button
              onClick={() => setShowLogin(true)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="px-5 py-2  text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="w-full py-28 flex flex-col justify-center text-center px-6 ">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Streamlined Project Management with <br />
          <span className="text-blue-600">Clear Role Control</span>
        </h2>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
          Perfectly balanced access control for teams. Admins manage everything,
          Managers handle tasks, Users focus on execution.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setShowRegister(true)}
            className="px-6 py-3 text-white rounded-lg shadow bg-blue-600 hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <button
            onClick={scrollToRoles}
            className="px-6 py-3 border text-gray-800 rounded-lg border-gray-300 hover:bg-gray-100 transition"
          >
            View Roles
          </button>
        </div>
      </section>
      {/* Roles Section */}
      <section ref={rolesRef} className="py-10 px-6 flex justify-center">
        <div className="max-w-5xl w-full">
          {/* Outer Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="grid md:grid-cols-3 gap-8 group">
              {/* Admin Card */}
              <div className="relative rounded-xl border-2 border-red-200 bg-red-50 p-8">
                <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-red-400"></div>

                <span className="inline-block px-4 py-1 text-sm font-medium rounded-lg bg-red-100 text-red-600">
                  Admin
                </span>

                <h4 className="mt-6 text-xl font-semibold text-orange-900">
                  Full System Control
                </h4>

                <ul className="mt-6 space-y-4 text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                    Create Projects & Users
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                    Assign Managers
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                    Full Edit/Delete Access
                  </li>
                </ul>
              </div>

              {/* Manager Card */}
              <div className="relative rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
                <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-blue-400"></div>

                <span className="inline-block px-4 py-1 text-sm font-medium rounded-lg bg-blue-100 text-blue-600">
                  Manager
                </span>

                <h4 className="mt-6 text-xl font-semibold text-gray-900">
                  Task Management
                </h4>

                <ul className="mt-6 space-y-4 text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                    Create & Assign Tasks
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                    Track Progress
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                    Manage Task Workflow
                  </li>
                </ul>
              </div>

              {/* User Card */}
              <div className="relative rounded-xl border-2 border-green-200 bg-green-50 p-8">
                <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-green-400"></div>

                <span className="inline-block px-4 py-1 text-sm font-medium rounded-lg bg-green-100 text-green-600">
                  User
                </span>

                <h4 className="mt-6 text-xl font-semibold text-gray-900">
                  Task Execution
                </h4>

                <ul className="mt-6 space-y-4 text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    View Assigned Tasks
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    Update Task Status
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    Focus on Completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      //
      <section ref={rolesRef} className="w-full py-6 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl mt-3 font-bold text-gray-900">
              Clear Roles, Clear Responsibilities
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Each role has precisely defined permissions to ensure smooth
              workflow and security.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 items-center perspective-[1000px]">
            {/* Administrator */}
            <div className="bg-white border border-red-200 rounded-xl shadow-sm p-11 text-center transform scale-95 transition-all duration-300  hover:scale-100 hover:-translate-y-3 hover:shadow-2xl">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xl">
                ✨
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Administrator
              </h3>

              <p className="text-sm text-red-500 mt-1">Full System Access</p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700 text-left">
                <li>✔ Create and manage all projects</li>
                <li>✔ Add/remove users and managers</li>
                <li>✔ Assign projects to managers</li>
                <li>✔ Full editing and deletion rights</li>
                <li>✔ System-wide oversight</li>
              </ul>
            </div>

            {/* Project Manager */}
            <div className="bg-white border border-blue-200 rounded-xl shadow-lg p-8 text-center transform scale-105 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-500 text-xl">
                📋
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Project Manager
              </h3>

              <p className="text-sm text-blue-500 mt-1">
                Task Management Focus
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700 text-left">
                <li>✔ Create and assign tasks to users</li>
                <li>✔ Set priorities and deadlines</li>
                <li>✔ Track task progress</li>
                <li>✔ Update task details</li>
                <li>✔ Manage assigned projects only</li>
              </ul>
            </div>

            {/* Team Member */}
            <div className="bg-white border border-red-200 rounded-xl shadow-sm p-8 text-center transform scale-95 transition-all duration-300  hover:scale-100 hover:-translate-y-3 hover:shadow-2xl">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-500 text-xl">
                ✔
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Team Member
              </h3>

              <p className="text-sm text-green-500 mt-1">
                Task Execution Focus
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700 text-left">
                <li>✔ View assigned tasks only</li>
                <li>✔ Update task status (To Do, In Progress, Done)</li>
                <li>✔ View project context</li>
                <li className="text-red-500">
                  ✖ Cannot create or assign tasks
                </li>
                <li className="text-red-500">
                  ✖ Cannot modify project details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Simple Effective Workflow */}
      <section className="w-full py-10 bg-gray-200  px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">
            Simple, Effective Workflow
          </h2>

          <p className="mt-3 text-gray-600">
            From project creation to task completion - streamlined for
            efficiency
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-10 mt-14 items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-300 text-blue-600 text-xl">
                +
              </div>

              <div className="mt-4 px-16 py-2 text-xs rounded-full bg-blue-100 text-blue-600">
                Step 1
              </div>

              <h4 className="mt-2 font-semibold text-gray-900">Admin</h4>

              <p className="text-sm text-gray-600">Creates Project</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-300 text-blue-600 text-xl">
                👥
              </div>

              <div className="mt-4 px-16 py-2 text-xs rounded-full bg-blue-100 text-blue-600">
                Step 2
              </div>

              <h4 className="mt-2 font-semibold text-gray-900">Admin</h4>

              <p className="text-sm text-gray-600">Assigns Manager</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-300 text-blue-600 text-xl">
                📋
              </div>

              <div className="mt-4 px-16 py-2 text-xs rounded-full bg-blue-100 text-blue-600">
                Step 3
              </div>

              <h4 className="mt-2 font-semibold text-gray-900">Manager</h4>

              <p className="text-sm text-gray-600">Creates Tasks</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-300 text-blue-600 text-xl">
                ✔
              </div>

              <div className="mt-4 px-16 py-2 text-xs rounded-full bg-blue-100 text-blue-600">
                Step 4
              </div>

              <h4 className="mt-2 font-semibold text-gray-900">User</h4>

              <p className="text-sm text-gray-600">Completes Tasks</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-24 px-6 bg-blue-300  text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Streamline Your Team's Workflow?
          </h2>

          <p className="mt-4 text-gray-700">
            Get started in minutes with our role-based project management
            system.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
               onClick={() => setShowRegister(true)}
              className="px-6 py-3  text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-blue-100 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-center text-gray-400">
        <div className="flex items-center justify-center gap-2 text-white font-semibold">
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
            TF
          </div>
          TaskFlow
        </div>

        <p className="mt-3 text-sm">
          © 2026 TaskFlow - Role-Based Project Management System
        </p>
      </footer>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

<RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
};

export default Welcome;
