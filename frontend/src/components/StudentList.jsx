import React from 'react';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students found. Add your first student to get started!</p>
      </div>
    );
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{formatDate(student.dateofbirth)}</td>
              <td>{student.email}</td>
              <td className="actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(student)}
                  title="Edit student"
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(student.id, student.name)}
                  title="Delete student"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
