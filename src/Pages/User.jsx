import React, { useState, useEffect, useMemo } from "react";
import PageTitle from "../components/PageTitle";
import filtericon from "../assets/images/FilterIcon.png";
import RefreshIcon from "../assets/images/RefreshIcon.png";
import ViewIcon from "../assets/images/ViewIcon.png";
import DeleteIcon from "../assets/images/DeleteIcon.png";
import AddUserModal from "../components/AddUserModal";
import DeleteUserModal from "../components/DeleteUserModal";
import Filter from "../components/Filter";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const { allUsers, loading, refreshUsers } = useUser();

  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    itemsPerPage: "10",
  });

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  // ✅ Flatten + unique users
  const users = useMemo(() => {
    const flattened = allUsers
      .flatMap((project) => project.users || [])
      .filter((user) => user?.name && user?.email);

    return [...new Map(flattened.map((user) => [user.id, user])).values()];
  }, [allUsers]);

  // ✅ Filter logic
  const filteredUsers = users.filter((user) => {
    const search = filters.search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
    );
  });

  const displayUsers = filteredUsers.slice(0, parseInt(filters.itemsPerPage));

  // 🔄 Reset filter
  const handleResetFilter = () => {
    setFilters({
      search: "",
      itemsPerPage: "10",
    });
  };

  // Optional: disable refresh when no filter
  const isFiltered = filters.search !== "" || filters.itemsPerPage !== "10";

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#ebe8e8] min-h-screen pb-10">
      <PageTitle onAddClick={() => setOpenModal(true)} />

      {/* ✅ FILTER MODAL */}
      {isFilterOpen && (
        <Filter
          type="user"
          onClose={() => setIsFilterOpen(false)}
          onApply={(data) => setFilters(data)}
          currentFilters={filters}
        />
      )}

      <section className="bg-white mt-7 rounded-md shadow-md border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between px-10 py-3">
          <span className="font-semibold text-gray-700">
            Total Users {filteredUsers.length}
          </span>

          <div className="flex items-center gap-2">
            {/* 🔄 Refresh */}
            {isFiltered && (
              <div
                onClick={handleResetFilter}
                className="flex items-center justify-center w-9 h-9  rounded-md cursor-pointer bg-[#F8F8F8] hover:bg-gray-100"
              >
                <img src={RefreshIcon} className="w-4 h-4" />
              </div>
            )}

            {/* 🔍 Filter */}
            <div
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center w-9 h-9 bg-[#F8F8F8] border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <img src={filtericon} className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Table */}
        <section className="px-10 pt-2 pb-9">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#F8F8F8] border-b">
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  ID
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Name
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Role
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Email Verified
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {displayUsers.length > 0 ? (
                displayUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/User/${user.id}`)}
                    className="cursor-pointer hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-sm">{index + 1}</td>
                    <td className="p-4 text-sm">{user.name}</td>
                    <td className="p-4 text-sm">{user.email}</td>

                    <td className="p-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "manager"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.role}
                        {user.role.toLowerCase()}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-600 font-medium">
                      Yes
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button>
                          <img src={ViewIcon} className="w-5 h-5 cursor-pointer" />
                        </button>

                        <button
                          onClick={(e) => {
    e.stopPropagation();   // ✅ stop row click
    setDeleteUser(user);
  }}
>
  <img
    src={DeleteIcon}
    className="w-5 h-5 cursor-pointer"
  />
                         
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-10 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>

      {/* Add Modal */}
      {openModal && (
        <AddUserModal
          closeModal={() => setOpenModal(false)}
          reloadUsers={refreshUsers}
        />
      )}

      {/* Delete Modal */}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          closeModal={() => setDeleteUser(null)}
          reloadUsers={refreshUsers}
        />
      )}
    </div>
  );
};

export default User;
