import { useState, useRef } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../Components/RegisterModal";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";




const Welcome = () => {

const { login } = useContext(UserContext);
const navigate = useNavigate();
  const rolesRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
const [showRegister, setShowRegister] = useState(false);
 

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLoginSuccess = () => {
    login();              
    setShowLogin(false);  
    navigate("/");        
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
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-500">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/>
  </svg>
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
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M360 160L280 160C266.7 160 256 149.3 256 136C256 122.7 266.7 112 280 112L360 112C373.3 112 384 122.7 384 136C384 149.3 373.3 160 360 160zM360 208C397.1 208 427.6 180 431.6 144L448 144C456.8 144 464 151.2 464 160L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 160C176 151.2 183.2 144 192 144L208.4 144C212.4 180 242.9 208 280 208L360 208zM419.9 96C407 76.7 385 64 360 64L280 64C255 64 233 76.7 220.1 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96L419.9 96z"/>
  </svg>
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
             <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-500">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
  </svg>
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
                <li className="text-gray-500">
                  ✖ Cannot create or assign tasks
                </li>
                <li className="text-gray-500">
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
    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-500 shadow-sm">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
  </svg>
</div>

    <div className="mt-4 px-16 py-2 text-xs rounded-full font-bold bg-blue-200 text-blue-600">
      Step 1
    </div>

    <h4 className="mt-2 font-semibold text-gray-900">Admin</h4>
    <p className="text-sm text-gray-600">Creates Project</p>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center">
   <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white text-blue-600">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"/>
  </svg>
</div>

    <div className="mt-4 px-16 py-2 text-xs rounded-full font-bold bg-blue-200 text-blue-600">
      Step 2
    </div>

    <h4 className="mt-2 font-semibold text-gray-900">Admin</h4>
    <p className="text-sm text-gray-600">Assigns Manager</p>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white text-blue-600">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M360 160L280 160C266.7 160 256 149.3 256 136C256 122.7 266.7 112 280 112L360 112C373.3 112 384 122.7 384 136C384 149.3 373.3 160 360 160zM360 208C397.1 208 427.6 180 431.6 144L448 144C456.8 144 464 151.2 464 160L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 160C176 151.2 183.2 144 192 144L208.4 144C212.4 180 242.9 208 280 208L360 208zM419.9 96C407 76.7 385 64 360 64L280 64C255 64 233 76.7 220.1 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96L419.9 96z"/>
  </svg>
</div>

    <div className="mt-4 px-16 py-2 text-xs rounded-full font-bold bg-blue-200 text-blue-600">
      Step 3
    </div>

    <h4 className="mt-2 font-semibold text-gray-900">Manager</h4>
    <p className="text-sm text-gray-600">Creates Tasks</p>
  </div>

  {/* Step 4 */}
  <div className="flex flex-col items-center">
  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white text-green-500">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
  </svg>
</div>

    <div className="mt-4 px-16 py-2 text-xs rounded-full font-bold bg-blue-200 text-blue-600">
      Step 4
    </div>

    <h4 className="mt-2 font-semibold text-gray-900">User</h4>
    <p className="text-sm text-gray-600">Completes Tasks</p>
  </div>

</div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-24 px-6 bg-[rgb(37,99,235)]  text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white">
            Ready to Streamline Your Team's Workflow?
          </h2>

          <p className="mt-4 text-white">
            Get started in minutes with our role-based project management
            system.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
               onClick={() => setShowRegister(true)}
              className="px-6 py-3  text-blue-600 font-bold rounded-lg bg-white hover:bg-gray-200 transition"
            >
              Create Account
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 border font-bold border-white text-white rounded-lg hover:bg-gray-200 transition"
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
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />

<RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
};

export default Welcome;
