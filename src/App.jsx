import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Project from "./pages/Project";
import { ProjectProvider } from "./Context/ProjectProvier";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import { UserProvider } from "./Context/UserProvider";
import UserDetail from "./pages/UserDetail";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        theme="light"
      />
      <UserProvider>
        <ProjectProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/welcome"
        element={!isAuthenticated ? <Welcome /> : <Navigate to="/" />}
      />

      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/welcome" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="User" element={<User />} />
        <Route path="User/:id" element={<UserDetail />} />
        <Route path="Project" element={<Project />} />
        <Route path="Project/:id" element={<ProjectDetails />} />
        <Route path="project/:id/task/:taskId" element={<TaskDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/welcome"} />}
      />
    </Routes>
  );
}

export default App;
