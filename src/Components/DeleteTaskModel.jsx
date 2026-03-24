import React from 'react'

const DeleteTaskModel = ({ task, closeModal, confirmDelete }) => {
    if (!task) return null;

    const handleDelete = () => {
        confirmDelete(task.id);
        closeModal();
    };
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4">
                    Delete Task
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    Are you sure you want to delete the task: <br />
                    <span className="font-bold text-gray-800">"{task.task_name}"</span>?
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

export default DeleteTaskModel
