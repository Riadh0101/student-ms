import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';
import { studentApi } from './services/api';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setError('');
      setSuccess('');

      if (editingStudent) {
        await studentApi.updateStudent(editingStudent.id, formData);
        setSuccess('Student updated successfully!');
      } else {
        await studentApi.createStudent(formData);
        setSuccess('Student created successfully!');
      }

      handleCloseModal();
      fetchStudents();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      setSuccess('');
      await studentApi.deleteStudent(id);
      setSuccess('Student deleted successfully!');
      fetchStudents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Management System</h1>
      </header>

      <main className="app-main">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button onClick={() => setError('')}>&times;</button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
            <button onClick={() => setSuccess('')}>&times;</button>
          </div>
        )}

        <div className="toolbar">
          <button className="btn-add" onClick={handleAdd}>
            + Add Student
          </button>
        </div>

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        student={editingStudent}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
