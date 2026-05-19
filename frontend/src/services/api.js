const API_URL = '/api';

export const studentApi = {
  async getAllStudents() {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch students');
    }
    return response.json();
  },

  async getStudent(id) {
    const response = await fetch(`${API_URL}/students/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch student');
    }
    return response.json();
  },

  async createStudent(student) {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.errors?.join(', ') || 'Failed to create student');
    }
    return response.json();
  },

  async updateStudent(id, student) {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.errors?.join(', ') || 'Failed to update student');
    }
    return response.json();
  },

  async deleteStudent(id) {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete student');
    }
    return response.json();
  },
};
