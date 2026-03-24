import React from 'react'

const DeleteProjectModel = ({ project, closeModal, confirmDelete }) => {
    if (!project) return null;

    const handleDelete = () => {
        confirmDelete(project.id);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4">
                    Delete Project
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    Are you sure you want to delete <b>{project.project_title}</b>?
                    <br />
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProjectModel
